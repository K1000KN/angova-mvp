import React, { useState } from "react";
import UserList from "./UserList";
import NewUserForm from "./NewUserForm";
import NavbarComponent from "../components/Navbar";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Dashboard = () => {
  const btnStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    backgroundColor: "#F49E4C",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#E27A35",
    },
  };
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRegistrationOpen = () => {
    setRegistrationOpen(true);
  };

  const handleRegistrationClose = () => {
    setRegistrationOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <Grid container>
        {/* Render the specific navbar for admin on the /backoffice page */}
        <NavbarComponent
          page="backoffice"
          setLanguageImage={(language) => {
            /* Implement the setLanguageImage function here */
          }}
        />
      </Grid>

      <Container sx={{ marginTop: "2rem", padding: "2rem" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: isMobileOrTablet ? "center" : "flex-end",
                alignItems: "center",
                padding: isMobileOrTablet ? "1rem" : "0",
                flexDirection: isMobileOrTablet ? "column" : "row",
                marginBottom: "1rem",
              }}
            >
              {isMobileOrTablet ? (
                <>
                  <Button onClick={handleRegistrationOpen} sx={btnStyle}>
                    <PersonAddIcon />
                  </Button>
                  <Container sx={{ width: "1rem" }} />
                  <Button onClick={handleLogout} sx={btnStyle}>
                    <LogoutIcon />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleRegistrationOpen}
                    sx={{
                      ...btnStyle,
                      width: "18rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    Nouvel utilisateur
                    <PersonAddIcon sx={{ marginLeft: "0.5rem" }} />
                  </Button>
                  <Button
                    onClick={handleLogout}
                    sx={{
                      ...btnStyle,
                      marginLeft: "1rem",
                      width: "5rem",
                    }}
                  >
                    <LogoutIcon />
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
        <UserList />
        <NewUserForm
          open={registrationOpen}
          handleClose={handleRegistrationClose}
        />
      </Container>
    </>
  );
};

export default Dashboard;
