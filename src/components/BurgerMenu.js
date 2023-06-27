import React, { useState, forwardRef } from "react";
import "../index.css";
import { slide as Menu } from "react-burger-menu";
import {
  Grid,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";

const arabicSquaredFlag = "./images/flag/squared/arabic.png";
const englishSquaredFlag = "./images/flag/squared/uk.png";
const frenchSquaredFlag = "./images/flag/squared/france.png";
const spanishSquaredFlag = "./images/flag/squared/spain.png";
const turkeyFlagSquared = "./images/flag/squared/turkey.png";
const theme = createTheme();

export default forwardRef(
  (
    {
      scrollToQuestion,
      scrollToCode,
      handleClickOpenLogin,
      changeFlag,
      t,
      i18n,
      setLanguageImage,
      handleGoToApp,
      isLoggedIn,
    },
    ref
  ) => {
    const [openPopUp, setOpenPopUp] = useState(false);

    const handleClickOpenPopUp = () => {
      setOpenPopUp(true);
    };
    const handleClosePopUp = () => {
      setOpenPopUp(false);
    };
    const FlagPopup = ({ src, language, lng }) => (
      <div
        className="flagPopup"
        onClick={() => {
          i18n.changeLanguage(language);
          changeFlag(src);
          setLanguage(language);
          setOpenPopUp(false);
        }}
      >
        <img style={{ width: 35, borderRadius: 3 }} src={src} alt="flag" />
        <span style={{ color: "black", marginLeft: 24 }}>
          {" "}
          {t("lgn" + lng)}
        </span>
      </div>
    );
    const setLanguage = (language) => {
      localStorage.setItem("hasChoosenLanguage", true);
      localStorage.setItem("language", language);
    };

    return (
      /// Menu mobile reponsive
      <Menu right>
        <Typography className="menu-item" onClick={scrollToCode}>
          {t("title-1.1.1")}
        </Typography>
        <Typography className="menu-item" onClick={scrollToQuestion}>
          {t("burger-qa")}
        </Typography>
        <div id="overlayBurgerWrapper" xs={5}>
          <div
            onMouseOver={() => {
              document.getElementById(
                "overlayGridMobile"
              ).style.backgroundColor = "rgba(216, 216, 216, 0.56)";
              document.getElementById("overlayGridMobile").style.borderRadius =
                "10px";
            }}
            onMouseLeave={() => {
              document.getElementById(
                "overlayGridMobile"
              ).style.backgroundColor = "rgba(216, 216, 216, 0)";
              document.getElementById("overlayGridMobile").style.borderRadius =
                "0px";
            }}
            onClick={() => {
              document.getElementById(
                "overlayGridMobile"
              ).style.backgroundColor = "rgba(216, 216, 216, 0.56)";
              document.getElementById("overlayGridMobile").style.borderRadius =
                "10px";
              document.getElementById("overlayLangueMobile").style.display =
                "block";
            }}
            id="overlayGridMobile"
          >
            <Typography className="menu-item" sx={{ fontSize: 11.5 }}>
              {t("popup")}
            </Typography>
            <img
              alt="flag"
              id="flagOfLanguage"
              src={
                localStorage.getItem("language") === null
                  ? frenchSquaredFlag
                  : setLanguageImage(localStorage.getItem("language"))
              }
            />
          </div>

          <div
            id="overlayLangueMobile"
            onClick={() => {
              document.getElementById(
                "overlayGridMobile"
              ).style.backgroundColor = "rgba(216, 216, 216, 0)";
              document.getElementById("overlayLangueMobile").style.display =
                "none";
            }}
          >
            <FlagPopup src={frenchSquaredFlag} language="fr" lng="1" />
            <FlagPopup src={arabicSquaredFlag} language="ar" lng="2" />
            <FlagPopup src={spanishSquaredFlag} language="es" lng="3" />
            <FlagPopup src={englishSquaredFlag} language="en" lng="4" />
            <FlagPopup src={turkeyFlagSquared} language="tr" lng="5" />
          </div>
        </div>
        <div id="popUpBurgerWrapper" xs={5}>
          <div
            onClick={() => {
              handleClickOpenPopUp();
            }}
            id="popUpGridMobile"
          >
            <Typography className="menu-item" sx={{ fontSize: 12 }}>
              {t("popup")}
            </Typography>
            <img
              alt="flag"
              id="flagOfLanguage"
              src={
                localStorage.getItem("language") === null
                  ? frenchSquaredFlag
                  : setLanguageImage(localStorage.getItem("language"))
              }
            />
          </div>
        </div>

        {isLoggedIn ? (
          <Button
            onClick={handleGoToApp}
            sx={{
              textTransform: "none",
              boxShadow: 0,
            }}
            style={{
              backgroundColor: "#F49E4C",
              marginTop: 10,
              borderRadius: 20,
            }}
            variant="contained"
          >
            {t("AppButton")}
          </Button>
        ) : (
          <Button
            className="menu-item"
            onClick={handleClickOpenLogin}
            sx={{ textTransform: "none", boxShadow: 0 }}
            style={{
              width: "100%",
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
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openPopUp}
          onClose={handleClosePopUp}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DialogTitle>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                Choisir la langue du site
              </Typography>
              <IconButton
                aria-label="close"
                style={{
                  position: "absolute",
                  right: theme.spacing(1),
                  top: theme.spacing(1),
                  color: theme.palette.grey[500],
                }}
                onClick={handleClosePopUp}
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
                <FlagPopup src={frenchSquaredFlag} language="fr" lng="1" />
                <FlagPopup src={arabicSquaredFlag} language="ar" lng="2" />
                <FlagPopup src={spanishSquaredFlag} language="es" lng="3" />
                <FlagPopup src={englishSquaredFlag} language="en" lng="4" />
                <FlagPopup src={turkeyFlagSquared} language="tr" lng="5" />
              </Grid>
            </DialogContent>
          </div>
        </Dialog>
      </Menu>
    );
  }
);
