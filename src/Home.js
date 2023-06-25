import "./index.css";
import "./home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import BottomBar from "./components/BottomBar";
import NavbarComponent from "./components/Navbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
// import { set } from "date-fns";

// const theme = createTheme();

function Home() {
  const franceRoundedFlag = "./images/flag/rounded/france.png";
  const englishRoundedFlag = "./images/flag/rounded/uk.png";
  const algeriaRoundedFlag = "./images/flag/rounded/algeria.png";
  const moroccoRoundedFlag = "./images/flag/rounded/morocco.png";
  const tuniRoundedFlag = "./images/flag/rounded/tunisia.png";
  const turkeyRoundedFlag = "./images/flag/rounded/turkey.png";
  const earthFlag = "./images/flag/rounded/earth.png";
  const spainRoundedFlag = "./images/flag/rounded/spain.png";

  const theme = createTheme({
    typography: {
      fontFamily: ["IgraSans", "Raleway", "Arial"].join(","),
    },
  });
  const [show, setShow] = useState(false);
  const [value, setValue] = React.useState("code");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "profil") {
      navigate("/profil");
    }
  };

  useEffect(() => {
    // we use this effect to see the language dialog
    // only if the user has not choose a language
    const hasLanguagePicked = localStorage.getItem("hasChoosenLanguage");

    if (hasLanguagePicked === null) {
      localStorage.setItem("hasChoosenLanguage", false);
    }
    if (hasLanguagePicked === "true") {
      setShow(false);
    } else {
      setLanguageImage("earth");
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    const hasLanguagePicked = localStorage.getItem("hasChoosenLanguage");
    if (hasLanguagePicked === "true") {
      setShow(false);
    }
  };

  const setLanguage = (language) => {
    localStorage.setItem("language", language);
    localStorage.setItem("hasChoosenLanguage", true);
    handleClose();
  };

  const Flag = ({ src, language }) => (
    <Grid
      item
      xs={4}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <img
        className="flagNav"
        style={{ width: "50%" }}
        onClick={() => {
          setLanguage(language);
        }}
        src={src}
        alt="flag"
      />
    </Grid>
  );

  const setLanguageImage = (language) => {
    let src = null;
    switch (language) {
      case "earth":
        src = earthFlag;
        break;
      case "fr":
        src = franceRoundedFlag;
        break;
      case "en":
        src = englishRoundedFlag;
        break;
      case "es":
        src = spainRoundedFlag;
        break;
      case "ar":
        src = moroccoRoundedFlag;
        break;
      case "alg":
        src = algeriaRoundedFlag;
        break;
      case "maroc":
        src = moroccoRoundedFlag;
        break;
      case "tuni":
        src = tuniRoundedFlag;
        break;
      case "tr":
        src = turkeyRoundedFlag;
        break;
      default:
        src = null;
        break;
    }

    return (
      <img
        className="languageNavImg"
        onClick={() => {
          setShow(true);
        }}
        src={src}
        alt={language}
      />
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavbarComponent
          setShow={setShow}
          page={value}
          setLanguageImage={setLanguageImage}
        />
        <Grid
          id="sessionContainer"
          container
          direction="row"
          style={{ height: "94vh" }}
        >
          <Grid
            item
            lg={3}
            sx={{
              flexDirection: "column",
              alignItems: "end",
              display: { xs: "none", lg: "flex" },
            }}
          >
            <button className="btn-section">
              <img
                src="./home.png"
                alt=""
                style={{ width: 40, marginRight: 15 }}
              />
              <span className="btn-section-title">Session de code</span>
            </button>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Grid container direction="row">
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 35,
                }}
              >
                <Card
                  sx={{
                    maxWidth: 345,
                    "&:hover": {
                      ".MuiCardMedia-root": {
                        filter: "brightness(70%)",
                        // msTransform: "scale(1.5)", /* IE 9 */
                        // webkitTransform: "scale(1.5)", /* Safari 3-8 */
                        // transform: "scale(1.5)"
                        backgroundSize: "120%",
                      },
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image="./images/session1.png"
                    className="imgSessionHome"
                    alt="session"
                    // Add this if you want the hover on the image only and remove the above hover
                    sx={{
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundSize: "120%",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      navigate("/session");
                    }}
                  />
                  {/* <div>
                    <img src="./images/play.png" />
                  </div> */}
                  <CardContent>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="h7"
                    >
                      Session 1
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog fullWidth maxWidth="sm" open={show} onClose={handleClose}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DialogTitle>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                Choisir la langue du code de la route
              </Typography>
              <IconButton
                aria-label="close"
                style={{
                  position: "absolute",
                  right: theme.spacing(1),
                  top: theme.spacing(1),
                  color: theme.palette.grey[500],
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                direction="row"
                style={{ alignItems: "center", marginBottom: 40 }}
              >
                <Flag src="./images/flag/rounded/france.png" language="fr" />
                <Flag src="./images/flag/rounded/spain.png" language="es" />
                <Flag src="./images/flag/rounded/uk.png" language="en" />
                <Flag src="./images/flag/rounded/algeria.png" language="alg" />
                <Flag
                  src="./images/flag/rounded/morocco.png"
                  language="maroc"
                />
                <Flag src="./images/flag/rounded/tunisia.png" language="tuni" />
                <Flag src="./images/flag/rounded/turkey.png" language="tr" />
              </Grid>
            </DialogContent>
          </div>
        </Dialog>{" "}
        <BottomBar handleChange={handleChange} value={value} />
      </ThemeProvider>
    </>
  );
}
export default Home;
