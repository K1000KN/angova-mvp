import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Landing from "./Landing";
import Home from "./Home";
import Session from "./Session";
import UserProfile from "./UserProfile";
import Dashboard from "./backoffice/Dashboard";
import NotFound from "./components/NotFound"; // Import your 404 component
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./i18n";
import jwt from "jwt-decode";

const theme = createTheme();

const PrivateRoute = ({ path, roles, children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;
  const userRole = token ? jwt(token).role : null;

  if (isAuthenticated && roles && roles.includes(userRole)) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
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
            path="/session"
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
