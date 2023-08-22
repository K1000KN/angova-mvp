import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NavbarComponent = ({ page, setLanguageImage }) => {
  const { t } = useTranslation();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      const decodedToken = decodeToken(token);
      const id = decodedToken.id;
      const role = decodedToken.role;
      setRole(role);
      console.log(role);
      let endpoint = `${apiUrl}/user/${id}`;

      if (role === "admin") {
        endpoint = `${apiUrl}/admin/${id}`;
      } else if (role === "manager") {
        endpoint = `${apiUrl}/manager/${id}`;
      }

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setUser(response.data);
        setIsUserFetched(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token && !isUserFetched) {
      getCurrentUser();
    }
  }, [token, isUserFetched, apiUrl]);

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
