import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom"; // Import useNavigate instead of useHistory
import { fetchCurrentUser } from "../services/userService";

const NavbarComponent = ({ page, setLanguageImage }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [role, setRole] = useState("");

  const fetchUser = async () => {
    const currentUser = await fetchCurrentUser(token);
    setUser(currentUser);
    setIsUserFetched(true);
    setRole(currentUser.role);
  };

  // Call fetchUser when token or isUserFetched changes
  if (token && (!user || !isUserFetched)) {
    fetchUser();
  }

  return (
    <div id="navContainer">
      <Grid container className="navContent" style={{ width: "85%" }}>
        <Grid
          item
          xs={4}
          id="languageNav"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            paddingLeft: "5vw",
          }}
        >
          {setLanguageImage(localStorage.getItem("language") || "earth")}
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          id="logoNav"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Add the Link component here */}
          <Link to="/home">
            <img
              id="imgLogoNav"
              style={{ width: 130 }}
              alt="road"
              src="./images/logo2.png"
            />
          </Link>
        </Grid>

        {page === "profil" ? (
          <Grid
            item
            xs={4}
            id="profilNav"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              paddingRight: "5vw",
            }}
          >
            <Link to="/home">
              <img
                id="profilNavImg"
                src="./images/code_route.png"
                style={{ width: 45, position: "absolute", bottom: 55 }}
                alt="profil"
              />
            </Link>
          </Grid>
        ) : (
          <Grid
            item
            xs={4}
            id="profilNav"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              paddingRight: "5vw",
            }}
          >
            {/* Render the /backoffice button for admin */}
            {isUserFetched && role === "admin" && (
              <Grid
                item
                xs={4}
                id="backofficeNav"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  paddingRight: "5vw",
                }}
              >
                <Link to="/backoffice">
                  <img
                    id="backofficeNavImg"
                    src="./images/backoffice_icon.png"
                    style={{
                      width: 45,
                      position: "absolute",
                      bottom: 55,
                      filter: "invert(1)",
                    }}
                    alt="backoffice"
                  />
                </Link>
              </Grid>
            )}
            <Link to="/profil">
              <img
                id="profilNavImg"
                src="./images/user.png"
                style={{ width: 45, position: "absolute", bottom: 55 }}
                alt="profil"
              />
            </Link>
          </Grid>
        )}

        <Grid item id="languageMobileNav">
          {setLanguageImage(localStorage.getItem("language") || "earth")}
        </Grid>

        <Grid item xs={12} id="welcomeHome" sx={{ marginBottom: "1vh" }}>
          {user && user.username}
        </Grid>
      </Grid>
    </div>
  );
};

export default NavbarComponent;
