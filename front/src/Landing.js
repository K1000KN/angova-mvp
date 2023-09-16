import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import AppBar from "@mui/material/AppBar";
import Player from "./components/Player";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SearchIcon from "@mui/icons-material/Search";
import RequestForm from "./components/RequestForm";
import MultiCarousel from "./components/MultiCarousel";
import ReviewCard from "./components/ReviewCard";
import BurgerMenu from "./components/BurgerMenu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FeedGet } from "./components/FeedGet";

function Landing() {
  const { t, i18n } = useTranslation();
  // const arabicSquaredFlag = "./images/flag/squared/arabic.png";
  // const trFlagSquared = "./images/flag/squared/tr.png";
  const enSquaredFlag = "./images/flag/squared/en.png";
  const frSquaredFlag = "./images/flag/squared/fr.png";
  const esSquaredFlag = "./images/flag/squared/es.png";
  const maSquaredFlag = "./images/flag/squared/ma.png";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const refCode = useRef(null);
  const refDesc = useRef(null);
  const refQuestion = useRef(null);
  const theme = createTheme({
    typography: {
      fontFamily: ["IgraSans", "Raleway", "Arial"].join(","),
    },
  });

  const iconStyle = {
    color: "#F49E4C",
    stroke: "black",
    strokeWidth: 1,
    fontSize: 30,
  };

  const sections = { color: "#FFFF", fontSize: 20, cursor: "pointer" };
  const flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [openLogin, setOpenLogin] = useState(false);
  const handleGoToApp = () => {
    setIsLoggedIn(false);
    navigate("/home");
  };
  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const [openRegister, setOpenRegister] = useState(false);
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const scrollToCode = () => {
    refCode.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToDesc = () => {
    refDesc.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToQuestion = () => {
    refQuestion.current?.scrollIntoView({ behavior: "smooth" });
  };

  const changeFlag = (lgn) => {
    document.getElementById("flagOfLanguage").src = lgn;
  };
  const isLanguageChoosen = localStorage.getItem("hasChoosenLanguage");
  if (isLanguageChoosen === null) {
    localStorage.setItem("hasChoosenLanguage", false);
  }

  const setLanguage = (language) => {
    localStorage.setItem("hasChoosenLanguage", true);
    localStorage.setItem("language", language);

    document.getElementById("overlayGrid").style.backgroundColor =
      "rgba(216, 216, 216, 0)";
    document.getElementById("overlayLangue").style.display = "none";
  };

  const FlagPopup = ({ src, language }) => (
    <div
      className="flagPopup"
      onClick={() => {
        i18n.changeLanguage(language);
        changeFlag(src);
        setLanguage(language);
      }}
    >
      <img style={{ width: 35, borderRadius: 3 }} src={src} alt="flag" />
      <div style={{ width: 10 }}></div>
      <span style={{ color: "black", marginLeft: 24 }}> {t(language)}</span>
      <div style={{ width: 10 }}></div>
    </div>
  );

  const setLanguageImage = (language) => {
    let src = null;
    switch (language) {
      case "fr":
        src = frSquaredFlag;
        break;
      case "en":
        src = enSquaredFlag;
        break;
      case "es":
        src = esSquaredFlag;
        break;
      // case "ar":
      //   src = arabicSquaredFlag;
      //   break;
      // case "dz":
      //   src = arabicSquaredFlag;
      //   break;
      case "ma":
        src = maSquaredFlag;
        break;
      // case "tn":
      //   src = arabicSquaredFlag;
      //   break;
      // case "tr":
      //   src = trFlagSquared;
      //   break;
      default:
        src = null;
        break;
    }
    return src;
  };

  useEffect(() => {
    if (isLanguageChoosen === "true") {
      i18n.changeLanguage(localStorage.getItem("language"));
    }
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [i18n, isLanguageChoosen, token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar
        sx={{
          borderBottom: 2,
          borderColor: "#D9DBE0",
          height: 80,
          justifyContent: "center",
        }}
        style={{ background: "#FFFF" }}
        elevation={0}
        position="fixed"
      >
        <Grid container direction="row" style={{ marginLeft: "8%" }}>
          <Grid item sx={{ display: { xs: "block", lg: "none" } }}>
            <BurgerMenu
              scrollToQuestion={scrollToQuestion}
              scrollToCode={scrollToCode}
              handleClickOpenLogin={handleClickOpenLogin}
              changeFlag={changeFlag}
              t={t}
              i18n={i18n}
              setLanguageImage={setLanguageImage}
              handleGoToApp={handleGoToApp}
              isLoggedIn={isLoggedIn}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <img id="logoNavLanding" alt="road" src="./images/logo.png" />
          </Grid>

          <Grid
            item
            id="langueNavLanding"
            onMouseLeave={() => {
              document.getElementById("overlayGrid").style.backgroundColor =
                "rgba(216, 216, 216, 0)";
              document.getElementById("overlayLangue").style.display = "none";
            }}
            xs={5}
            sx={{ display: { xs: "none", lg: "flex" } }}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid
              onMouseOver={() => {
                document.getElementById("overlayGrid").style.backgroundColor =
                  "rgba(216, 216, 216, 0.56)";
                document.getElementById("overlayGrid").style.borderRadius =
                  "10px";
                document.getElementById("overlayLangue").style.display =
                  "block";
                //f49d4c5e
              }}
              id="overlayGrid"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                marginRight: 10,
                width: 300,
              }}
            >
              {/* <Toolbar> */}
              <Typography
                variant="h6"
                style={{ color: "black", margin: 0, padding: 0 }}
              >
                {t("popup")}
              </Typography>
              {/* </Toolbar> */}
              <div style={{ width: 10 }}></div>
              <img
                alt="flag"
                id="flagOfLanguage"
                src={
                  localStorage.getItem("language") === null
                    ? frSquaredFlag
                    : setLanguageImage(localStorage.getItem("language"))
                }
              />
            </Grid>

            <div id="overlayLangue">
              <FlagPopup src={frSquaredFlag} language="fr" lng="1" />
              <FlagPopup src={maSquaredFlag} language="ma" lng="2" />
              <FlagPopup src={esSquaredFlag} language="es" lng="3" />
              <FlagPopup src={enSquaredFlag} language="en" lng="4" />
              {/* <FlagPopup src={trFlagSquared} language="tr" lng="5" /> */}
            </div>
          </Grid>

          <Grid item xs={2} sx={{ display: { xs: "none", lg: "block" } }}>
            {isLoggedIn ? (
              <Button
                onClick={handleGoToApp}
                sx={{
                  textTransform: "none",
                  boxShadow: 0,
                }}
                style={{
                  width: "12vw",
                  height: 40,
                  backgroundColor: "#F49E4C",
                  marginTop: 11,
                  borderRadius: 20,
                }}
                variant="contained"
              >
                {t("AppButton")}
              </Button>
            ) : (
              <Button
                onClick={handleClickOpenLogin}
                sx={{
                  textTransform: "none",
                  boxShadow: 0,
                }}
                style={{
                  width: "10vw",
                  height: 40,
                  backgroundColor: "#F49E4C",
                  marginTop: 11,
                  borderRadius: 20,
                }}
                variant="contained"
              >
                {t("loginButton")}
              </Button>
            )}
          </Grid>
        </Grid>
      </AppBar>

      <div
        style={{ width: "100%", height: "10vh" }}
        ref={refCode}
        id="code"
      ></div>
      <Grid
        container
        direction="row"
        className="gridContainer"
        justifyContent="center"
      >
        <Grid className="codeDeLaRoute" item xs={12} lg={5}>
          <Typography className="title">{t("title-1.1.1")} </Typography>
          <Typography id="title2">{t("title-1.1.2")}</Typography>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <MultiCarousel />

            <Player />
          </Grid>

          <Typography id="callToAction">{t("title-1.2")}</Typography>

          <Button
            onClick={handleClickOpenRegister}
            className="btnRegister"
            variant="contained"
            startIcon={<AppRegistrationIcon />}
          >
            {t("registerButton")}
          </Button>
        </Grid>
        <Grid
          id="player1"
          style={{ paddingLeft: 30, marginTop: "7vh" }}
          sx={{ display: { xs: "none", lg: "block" } }}
          item
          xs={7}
        >
          <MultiCarousel />
          <Player />
        </Grid>
      </Grid>
      <RegistrationForm open={openRegister} handleClose={handleCloseRegister} />
      <LoginForm open={openLogin} handleClose={handleCloseLogin} />
      <div className="scrollerPoint" ref={refDesc}></div>
      <Divider
        sx={{ marginLeft: "10%", marginRight: "10%", borderBottomWidth: 2 }}
        variant="middle"
      />
      <Grid
        id="descContainer"
        container
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={5}>
          <Typography
            className="title"
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {t("title-1.3.1")} <br /> {t("title-1.3.2")}
          </Typography>
          <img style={{ width: "96%" }} alt="road" src="./images/car.gif" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            className="title"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {t("title-1.3.1")} <br /> {t("title-1.3.2")}
          </Typography>
          <Grid id="descWrapper" container direction="row">
            <Grid item xs={12} md={6} style={{ padding: 20 }}>
              <FlagIcon style={iconStyle} />
              <Typography className="title3">{t("objective")}</Typography>
              <Typography
                style={{ fontSize: 18, fontFamily: "'Raleway', 'Arial'" }}
              >
                {t("objectiveP")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} style={{ padding: 20 }}>
              <HelpIcon style={iconStyle} />
              <Typography className="title3">{t("why")}</Typography>
              <Typography
                style={{ fontSize: 18, fontFamily: "'Raleway', 'Arial'" }}
              >
                {t("whyP")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} style={{ paddingLeft: 21 }}>
              <SearchIcon style={iconStyle} />
              <Typography className="title3">{t("how")}</Typography>
              <Typography
                style={{ fontSize: 18, fontFamily: "'Raleway', 'Arial'" }}
              >
                {t("howP")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="scrollerPoint2" ref={refQuestion} id="contact"></div>
      <Divider
        sx={{ marginLeft: "10%", marginRight: "10%", borderBottomWidth: 2 }}
        variant="middle"
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        className="contactezNous"
      >
        <Grid
          className="contactWrapper"
          sx={{ display: { xs: "none", md: "block" } }}
          item
          xs={12}
          md={6}
        >
          <Typography className="title" id="titleContact">
            {t("title-1.3")}{" "}
          </Typography>
          <ReviewCard />
        </Grid>
        <Grid item xs={12} lg={6} id="requestForm">
          <Typography
            className="title"
            id="titleContact"
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {t("title-1.3")}{" "}
          </Typography>
          <RequestForm />
        </Grid>
        <Grid
          className="contactWrapper"
          sx={{ display: { xs: "block", md: "none" } }}
          item
          xs={12}
          md={6}
        >
          <ReviewCard />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        xs={12}
        style={{ backgroundColor: "#000", height: "auto", padding: 10 }}
        item
      >
        <Grid item xs={12} md={2} sx={flexCenter}>
          <img style={{ width: 160 }} alt="road" src="./images/logo2.png" />
        </Grid>
        <Grid
          item
          md={8}
          sx={{
            marginTop: "15px",
            flexDirection: "column",
            justifyContent: "end",
            display: { xs: "none", md: "block", lg: "flex" },
          }}
        >
          <Grid container direction="row" sx={flexCenter}>
            <Typography style={sections} onClick={scrollToCode}>
              {t("footer-1")}
            </Typography>
            <Typography style={sections} onClick={scrollToDesc}>
              {t("footer-2")}
            </Typography>
            <Typography style={sections} onClick={scrollToQuestion}>
              {t("footer-3")}
            </Typography>
          </Grid>
          <Divider
            variant="middle"
            sx={{ borderColor: "#FFFF", marginTop: "20px" }}
          />

          <Typography
            style={{
              marginTop: "165px",
              marginBottom: "10px",
              color: "#FFFF",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            {t("copyright")}
          </Typography>
        </Grid>

        <Grid item xs={12} md={2} sx={flexCenter}>
          {/* <img
            style={{ width: 35, marginRight: "10px" }}
            alt="road"
            src="./images/tiktok.png"
          />
          <InstagramIcon
            sx={{ color: "#FFFF", fontSize: 35, marginRight: "10px" }}
          />{" "}
          <LinkedInIcon sx={{ color: "#FFFF", fontSize: 35 }} /> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Landing;
