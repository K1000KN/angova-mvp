import "../index.css";
import "../home.css";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";



import { useTranslation } from "react-i18next";

function FlagPopUp({setLanguage, show, handleClose}) {
  const { t, i18n } = useTranslation();
 

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
      backgroundColor: "rgba(70, 145, 205, 0.8)",
      color: "#fff",
      transition: "transform 0.3s ease",
      transform: "translateY(100%)",
      "&.active": {
        transform: "translateY(0)",
      },
      cursor: "pointer",
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


const classes = useStyles();

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
            {t(language)}
            </div>
        </Grid>
        );
    };
 
 
  return (
    <>
     
        <Dialog fullWidth maxWidth="sm" open={show} onClose={handleClose}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DialogTitle>
              <Typography style={{ fontWeight: 700 }}>
                {t("choisir-la-langue-du-code-de-la-route")}
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
                {/* <Flag src="./images/flag/rounded/uk.png" language="en" /> */}
                {/* <Flag src="./images/flag/rounded/algeria.png" language="dz" /> */}
                <Flag src="./images/flag/rounded/morocco.png" language="ma" />
                {/* <Flag src="./images/flag/rounded/tunisia.png" language="tn" /> */}
                {/* <Flag src="./images/flag/rounded/turkey.png" language="tr" /> */}
              </Grid>
            </DialogContent>
          </div>
        </Dialog>
       
    </>
  );
}
export default FlagPopUp;
