import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Landing from "./Landing";
import Home from "./Home";
import Session from "./Session";
import UserProfile from "./UserProfile";
import Dashboard from "./backoffice/Dashboard";
import NotFound from "./components/NotFound";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./i18n";
import jwt_decode from "jwt-decode";

const theme = createTheme();

const PrivateRoute = ({ path, roles, children }) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const isAuthenticated = !!token;
  const userRole = token ? jwt_decode(token).role : null;

  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;

  const refreshAccessToken = useCallback(async () => {
    try {
      const endpoint = `${apiUrl}/${userRole}/refresh-token`; // Endpoint based on user role

      // Call your backend API to refresh the access token
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        // Handle refresh token error (e.g., show error message)
        throw new Error("Failed to refresh access token");
      }

      const { token: newToken } = await response.json();

      // Update the access token in local storage
      localStorage.setItem("token", newToken);

      // Return the new access token
      return newToken;
    } catch (error) {
      console.error("Error refreshing access token", error);
      // Handle refresh token error (e.g., redirect to login page)
      throw error;
    }
  }, [refreshToken, userRole]);

  const tokenIsExpired = useCallback(() => {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && roles && roles.includes(userRole)) {
      return;
    }
    console.log("PrivateRoute", isAuthenticated, roles, userRole);

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate("/", { replace: true });
      return;
    }

    if (tokenIsExpired()) {
      // Access token expired, refresh it
      refreshAccessToken()
        .then((newToken) => {
          // Update the access token in local storage
          localStorage.setItem("token", newToken);
          // Reload the current page to reflect the new token
          window.location.reload();
        })
        .catch((error) => {
          // Handle refresh token error (e.g., redirect to login page)
          navigate("/", { replace: true });
        });
      return;
    }

    // User role not authorized
    navigate("/", { replace: true });
  }, [
    isAuthenticated,
    roles,
    userRole,
    refreshToken,
    token,
    path,
    children,
    navigate,
    refreshAccessToken,
    tokenIsExpired,
  ]);

  return isAuthenticated && roles && roles.includes(userRole) ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <PrivateRoute roles={["user", "manager", "admin"]}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/session/:id"
            element={
              <PrivateRoute roles={["user", "manager", "admin"]}>
                <Session />
              </PrivateRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <PrivateRoute roles={["user", "manager", "admin"]}>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/backoffice"
            element={
              <PrivateRoute roles={["admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
