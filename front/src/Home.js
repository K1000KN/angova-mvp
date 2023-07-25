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
import { session1FR } from "./data/sessions/fr/session_1.js";
import { session2FR } from "./data/sessions/fr/session_2.js";
import { session3FR } from "./data/sessions/fr/session_3";

function Home() {
  const franceRoundedFlag = "./images/flag/rounded/france.png";
  const englishRoundedFlag = "./images/flag/rounded/uk.png";
  const algeriaRoundedFlag = "./images/flag/rounded/algeria.png";
  const moroccoRoundedFlag = "./images/flag/rounded/morocco.png";
  const tuniRoundedFlag = "./images/flag/rounded/tunisia.png";
  const turkeyRoundedFlag = "./images/flag/rounded/turkey.png";
  const earthFlag = "./images/flag/rounded/earth.png";
  const spainRoundedFlag = "./images/flag/rounded/spain.png";
  const ukraineRoundedFlag = "./images/flag/rounded/ukraine.png";

  const theme = createTheme({
    typography: {
      fontFamily: ["IgraSans", "Raleway", "Arial"].join(","),
    },
  });

  const useStyles = makeStyles({
    container: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
      gap: 30,
    },
    card: {
      position: "relative",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
    },
    cardMedia: {
      height: "100%",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundSize: "120%",
        cursor: "pointer",
      },
    },
    slide2: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      transition: "transform 0.3s ease",
      transform: "translateY(100%)",
      "&.active": {
        transform: "translateY(0)",
      },
    },
    slide2Title: {
      fontWeight: 600,
      color: "#F49E4C",
      textAlign: "center",
    },
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
  const sessions = [session1FR, session2FR, session3FR];

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
  const [hoveredCard, setHoveredCard] = useState(null);
  const classes = useStyles();
  const handleHover = (id) => {
    setHoveredCard(id);
  };
  const Flag = ({ src, language }) => {
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
      case "ukr":
        src = ukraineRoundedFlag;
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
  const Slide = ({ active, title }) => {
    const classes = useStyles();

    return (
      <div className={`${classes.slide2} ${active ? "active" : ""}`}>
        <Typography variant="h6" className={classes.slide2Title}>
          {title}
        </Typography>
      </div>
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
          style={{ height: "89vh" }}
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
                src="./images/code_route.png"
                alt=""
                style={{ width: 40, marginRight: 15 }}
              />
              <span className="btn-section-title">Code de la route</span>
            </button>

            <button className="btn-section">
              <img
                src="./images/quizz.png"
                alt=""
                style={{ width: 40, marginRight: 15 }}
              />
              <span className="btn-section-title">Quizz</span>
            </button>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Grid container flexDirection="row" className={classes.container}>
              {sessions.map((session) => (
                <Grid item xs={12} sm={5} lg={3.7} key={session.id}>
                  <Card
                    onClick={() => {
                      navigate(`/session/${session.id}`);
                    }}
                    className={classes.card}
                    onMouseEnter={() => handleHover(session.id)}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={session.image}
                      alt="session"
                      className={classes.cardMedia}
                    />
                    <div
                      className={`${classes.slide2} ${
                        hoveredCard === session.id ? "active" : ""
                      }`}
                    >
                      <Typography variant="h6" className={classes.slide2Title}>
                        {session.title}
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              ))}
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
        </Dialog>
        <BottomBar handleChange={handleChange} value={value} />
      </ThemeProvider>
    </>
  );
}
export default Home;
