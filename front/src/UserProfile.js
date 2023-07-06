import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const UserProfile = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);

  /// Flags
  const franceRoundedFlag = "./images/flag/rounded/france.png";
  const englishRoundedFlag = "./images/flag/rounded/uk.png";
  const algeriaRoundedFlag = "./images/flag/rounded/algeria.png";
  const moroccoRoundedFlag = "./images/flag/rounded/morocco.png";
  const tuniRoundedFlag = "./images/flag/rounded/tunisia.png";
  const turkeyRoundedFlag = "./images/flag/rounded/turkey.png";
  const earthFlag = "./images/flag/rounded/earth.png";
  const spainRoundedFlag = "./images/flag/rounded/spain.png";
  const ukraineRoundedFlag = "./images/flag/rounded/ukraine.png";

  const navigate = useNavigate();
  const [value, setValue] = useState("profil");
  const [show, setShow] = useState(false);
  const [showDeleteProfileDialog, setShowDeleteProfileDialog] = useState(false);
  const [selectedUserToBeDeleted, setSelectedUserToBeDeleted] = useState(null);
  const [showDeleteFromUsersDialog, setShowDeleteFromUsersDialog] =
    useState(false);

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
    field: {
      marginTop: "12px !important",
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue !== "profil") {
      navigate("/home");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeDeleteFromUsersDialog = () => {
    setShowDeleteFromUsersDialog(false);
  };

  const openDeleteFromUsersDialog = (id) => {
    setShowDeleteFromUsersDialog(true);
    setSelectedUserToBeDeleted(id);
  };

  const openDeleteProfileDialog = () => {
    setShowDeleteProfileDialog(true);
  };

  const closeDeleteProfileDialog = () => {
    setShowDeleteProfileDialog(false);
  };

  const deleteProfile = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    const role = decodedToken.role;
    try {
      const response = await axios.delete(
        `${apiUrl}/${role}/${decodedToken.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
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

  // Check if the user has already picked a language
  useEffect(() => {
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
  const classes = useStyles();
  const { t } = useTranslation();

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

  /// List Manager Users

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const managerId = decodedToken.id;
      const userFromManager = response.data.filter(
        (user) =>
          user.roles.some((role) => role.name === "user") &&
          user.manager === managerId
      );
      setUsers(userFromManager);
    } catch (error) {
      console.error("Error:", error);
      // Handle error state or display an error message
    }
  }, [decodedToken.id, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /// Editing profile

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    if (roleUser === "manager") {
      updateManager();
    }
    if (roleUser === "user") {
      updateUser();
    }
  };
  const updateUser = async () => {
    const id = decodedToken.id;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const endpoint = `${apiUrl}/user/${id}`;
    const response = await axios.put(endpoint, user, { headers });
    console.log(response);
  };

  const updateManager = async () => {
    const id = decodedToken.id;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const endpoint = `${apiUrl}/manager/${id}`;
    const response = await axios.put(endpoint, user, { headers });
    console.log(response);
  };
  const [user, setUser] = useState(null);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [roleUser, setRoleUser] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      const decodedToken = decodeToken(token);
      const id = decodedToken.id;
      const role = decodedToken.role;

      let endpoint = `${apiUrl}/user/${id}`;
      setRoleUser(role);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [usersList, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddUser = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const paperStyle = {
    padding: "0 15px 40px 15px",
    display: "flex",
    flexDirection: "column",
  };
  const btnStyle = {
    marginTop: 10,
    width: "70%",
    marginLeft: "15%",
    backgroundColor: "#F49E4C",
  };
  const ageRegExp = /^\d+$/;
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const initialValues = {
    name: "",
    firstname: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t("message-input-verif")}`)
      .required("Requis"),
    firstname: Yup.string()
      .min(3, `${t("message-input-verif")}`)
      .required("Requis"),
    email: Yup.string()
      .email(`${t("email-input-verif")}`)
      .required("Requis"),
    age: Yup.string().matches(ageRegExp, `${t("nb-input-verif")}`),
    password: Yup.string()
      .min(8, `${t("password-input-verif")}`)
      .matches(
        passwordRegExp,
        "Password must have one upper, lower case, number"
      )
      .required("Requis"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mots de passe ne correspondent pas")
      .required("Requis"),
  });

  const onSubmitAddNewUser = async (values, props) => {
    const user = {
      username: values.name,
      // firstname: values.firstname,
      // age: values.age,
      email: values.email,
      password: values.password,
    };
    try {
      const endpoint = `${apiUrl}/manager/create`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(endpoint, user, { headers });
      setUsers([...usersList, user]);
      props.resetForm();
      handleCloseDialog();
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${apiUrl}/user/${selectedUserToBeDeleted}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const newUsers = [...usersList];
        const index = newUsers.findIndex(
          (user) => user._id === selectedUserToBeDeleted
        );
        newUsers.splice(index, 1);
        setUsers(newUsers);
        setShowDeleteFromUsersDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavbarComponent page={value} setLanguageImage={setLanguageImage} />
      {user && (
        <Grid
          id="sessionContainer"
          container
          direction="row"
          style={{ height: "94vh", overflow: "auto", maxHeight: "90vh" }}
        >
          <Box sx={{ maxWidth: "75%", mx: "auto" }}>
            <Typography variant="h4" gutterBottom sx={{ marginTop: "30px" }}>
              {isEditing ? "Editer mon profil" : "Mon profil"}
            </Typography>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Name"
              value={user.username}
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
              value={user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              margin="normal"
              variant="outlined"
            />
            {/* <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              type="number"
              value={0}
              onChange={handleInputChange}
              disabled={!isEditing}
              margin="normal"
              variant="outlined"
            /> */}

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
                gap: 2,
              }}
            >
              {isEditing ? (
                <Button variant="contained" onClick={handleSaveClick}>
                  Sauvegarder
                </Button>
              ) : (
                <Button variant="contained" onClick={handleEditClick}>
                  Modifier
                </Button>
              )}

              <Button
                variant="contained"
                onClick={openDeleteProfileDialog}
                color="error"
              >
                Suppression
              </Button>
              <Button variant="contained" onClick={logout} color="primary">
                Deconnexion
              </Button>
            </Grid>

            {roleUser === "manager" ? (
              <>
                <Typography variant="h4" sx={{ marginTop: "30px" }}>
                  Ajouter un utilisateur
                </Typography>
                <Paper sx={{ marginTop: "30px", marginBottom: "30px" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nom</TableCell>
                          <TableCell>Prénom</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {usersList.map((element, index) => (
                          <TableRow key={index}>
                            <TableCell>{element.username}</TableCell>
                            <TableCell>{element.email}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() =>
                                  openDeleteFromUsersDialog(element._id)
                                }
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "1rem",
                    }}
                  >
                    <IconButton
                      onClick={handleAddUser}
                      variant="contained"
                      color="primary"
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </div>

                  <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Inscription</DialogTitle>
                    <DialogContent>
                      <Grid>
                        <Paper elevation={0} style={paperStyle}>
                          <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmitAddNewUser}
                          >
                            {(props) => (
                              <Form noValidate>
                                <Field
                                  className={classes.field}
                                  as={TextField}
                                  name="name"
                                  label={t("input-form-Lname")}
                                  fullWidth
                                  error={
                                    props.errors.name && props.touched.name
                                  }
                                  helperText={<ErrorMessage name="name" />}
                                  required
                                />

                                <Field
                                  className={classes.field}
                                  as={TextField}
                                  name="firstname"
                                  label={t("input-form-Fname")}
                                  fullWidth
                                  error={
                                    props.errors.firstname &&
                                    props.touched.firstname
                                  }
                                  helperText={<ErrorMessage name="firstname" />}
                                  required
                                />

                                <Field
                                  className={classes.field}
                                  as={TextField}
                                  name="age"
                                  label="Age"
                                  type="number"
                                  fullWidth
                                />

                                <Field
                                  className={classes.field}
                                  as={TextField}
                                  name="email"
                                  label="Email"
                                  fullWidth
                                  error={
                                    props.errors.email && props.touched.email
                                  }
                                  helperText={<ErrorMessage name="email" />}
                                  required
                                />

                                <Field
                                  className={classes.field}
                                  as={TextField}
                                  name="password"
                                  label={t("input-form-password")}
                                  type="password"
                                  fullWidth
                                  error={
                                    props.errors.password &&
                                    props.touched.password
                                  }
                                  helperText={<ErrorMessage name="password" />}
                                  required
                                />

                                <Field
                                  className={classes.field}
                                  as={TextField}
                                  name="confirmPassword"
                                  label={t("input-form-confirm-password")}
                                  type="password"
                                  fullWidth
                                  error={
                                    props.errors.confirmPassword &&
                                    props.touched.confirmPassword
                                  }
                                  helperText={
                                    <ErrorMessage name="confirmPassword" />
                                  }
                                  required
                                />

                                <Button
                                  type="submit"
                                  style={btnStyle}
                                  variant="contained"
                                >
                                  {t("register-button")}
                                </Button>
                              </Form>
                            )}
                          </Formik>
                        </Paper>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Paper>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
      )}
      {/* CHOSE LANGUAGE  */}
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
      {/* DELETE MY ACCOUNT MODAL */}
      <Dialog open={showDeleteProfileDialog} onClose={closeDeleteProfileDialog}>
        <DialogTitle>Suppression du compte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment supprimer votre compte ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteProfileDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={deleteProfile} color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      {/* DELETE USER LIST ACCOUNTS MODAL */}
      <Dialog
        open={showDeleteFromUsersDialog}
        onClose={closeDeleteFromUsersDialog}
      >
        <DialogTitle>Suppression du compte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment supprimer cet utilisateur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteFromUsersDialog} color="primary">
            Annuler
          </Button>
          <Button
            onClick={async () => {
              deleteUser(selectedUserToBeDeleted);
            }}
            color="primary"
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      <BottomBar handleChange={handleChange} value={value} />
    </ThemeProvider>
  );
};

export default UserProfile;
