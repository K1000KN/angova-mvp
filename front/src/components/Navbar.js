import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "react-jwt";

const NavbarComponent = ({ page, setLanguageImage }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isUserFetched, setIsUserFetched] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const decodedToken = decodeToken(token);
      const id = decodedToken.id;
      const role = decodedToken.role;
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
  }, [token, isUserFetched]);

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
          <img
            id="imgLogoNav"
            style={{ width: 130 }}
            alt="road"
            src="./images/logo2.png"
          />
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
              <div id="homeNavImgDiv">
                <img id="homeNavImg" src="./images/home.png" alt="profil" />
              </div>
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
          Bienvenue {user && user.username}
        </Grid>
      </Grid>
    </div>
  );
};

export default NavbarComponent;
