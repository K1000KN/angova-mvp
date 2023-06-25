import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const franceRoundedFlag = "./images/flag/rounded/france.png";
  const englishRoundedFlag = "./images/flag/rounded/uk.png";
  const algeriaRoundedFlag = "./images/flag/rounded/algeria.png";
  const moroccoRoundedFlag = "./images/flag/rounded/morocco.png";
  const tuniRoundedFlag = "./images/flag/rounded/tunisia.png";
  const turkeyRoundedFlag = "./images/flag/rounded/turkey.png";
  const earthFlag = "./images/flag/rounded/earth.png";
  const spainRoundedFlag = "./images/flag/rounded/spain.png";
  const navigate = useNavigate();
  const [value, setValue] = React.useState("profil");
  const [show, setShow] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue !== "profil") {
      navigate("/home");
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

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const theme = useTheme();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform API call or update the user information in some way
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <Box sx={{ maxWidth: 400, mx: "auto" }}>
          <Typography variant="h4" gutterBottom>
            {isEditing ? "Edit User Information" : "User Information"}
          </Typography>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={userInfo.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={userInfo.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="age"
            name="age"
            label="Age"
            type="number"
            value={userInfo.age}
            onChange={handleInputChange}
            disabled={!isEditing}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="bio"
            name="bio"
            label="Bio"
            multiline
            rows={4}
            value={userInfo.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            margin="normal"
            variant="outlined"
          />
          {isEditing ? (
            <Button variant="contained" onClick={handleSaveClick}>
              Save
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </Box>
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
              <Flag src="./images/flag/rounded/morocco.png" language="maroc" />
              <Flag src="./images/flag/rounded/tunisia.png" language="tuni" />
              <Flag src="./images/flag/rounded/turkey.png" language="tr" />
            </Grid>
          </DialogContent>
        </div>
      </Dialog>{" "}
      <BottomBar handleChange={handleChange} value={value} />
    </ThemeProvider>
  );
};

export default UserProfile;
