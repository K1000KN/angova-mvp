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
import { makeStyles } from "@mui/styles";
import { session1 } from "./data/sessions/fr/session_1.js";
import { session2 } from "./data/sessions/fr/session_2.js";
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

  const useStyles = makeStyles({
    flagNav: {
      width: "50%",
      cursor: "pointer",
      transition: "filter 0.3s, transform 0.3s",
      "&:hover": {
        filter: "brightness(80%)",
        transform: "scale(1.1)",
      },
    },
    languageText: {
      marginTop: 10,
      color: "#888",
      fontSize: 12,
      fontWeight: "bold",
      opacity: 0,
      transition: "opacity 0.3s",
    },
    languageTextVisible: {
      opacity: 1,
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
  const sessions = [session1, session2];

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

  const Flag = ({ src, language }) => {
    const classes = useStyles();
    const [isLanguageVisible, setLanguageVisible] = useState(false);

    const handleClick = () => {
      setLanguage(language);
    };

    const handleMouseEnter = () => {
      setLanguageVisible(true);
    };

    const handleMouseLeave = () => {
      setLanguageVisible(false);
    };

    return (
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
          className={classes.flagNav}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          src={src}
          alt="flag"
        />
        <div
          className={`${classes.languageText} ${
            isLanguageVisible ? classes.languageTextVisible : ""
          }`}
        >
          {language}
        </div>
      </Grid>
    );
  };
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
        <NavbarComponent page={value} setLanguageImage={setLanguageImage} />
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
            <Grid   style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 35,
                }}> 
              {sessions.map((session) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                
              >
               
                  <Card
                    sx={{
                      "&:hover": {
                        ".MuiCardMedia-root": {
                          filter: "brightness(70%)",
                          backgroundSize: "120%",
                        },
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={session.image}
                      className="imgSessionHome"
                      alt="session"
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundSize: "120%",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => {
                        navigate(`/session/${session.id}`);
                      }}
                    />
                    <CardContent>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          justifyContent: "center",
                        }}
                        variant="h7"
                      >
                        {session.title}
                      </Typography>
                    </CardContent>
                  </Card>
                
              </Grid>))}
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
