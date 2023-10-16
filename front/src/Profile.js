import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@mui/styles";
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
import NewUserForm from "./components/NewUserForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FlagPopUp from "./components/FlagPopUp";
import { fetchCurrentUser } from "./services/userService";
const theme = createTheme();
const apiUrl = process.env.REACT_APP_API_URL;

const Profile = () => {
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
  const [showResetPwdDialog, setShowResetPwdDialog] = useState(false);
  const [selectedUserToBeDeleted, setSelectedUserToBeDeleted] = useState(null);
  const [message, setMessage] = useState("");
  const [showDeleteFromUsersDialog, setShowDeleteFromUsersDialog] =
    useState(false);

  const useStyles = makeStyles({
    closeButton: {
      position: "absolute !important",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
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
  const openResetPwdDialog = () => {
    setShowResetPwdDialog(true);
  };
  const closeDeleteProfileDialog = () => {
    setShowDeleteProfileDialog(false);
  };
  const closeResetPwdDialog = () => {
    setShowResetPwdDialog(false);
  };

  const deleteProfile = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    const role = decodedToken.role;
    try {
      const response = await axios.delete(
        `${apiUrl}/${role}/delete/${decodedToken.id}`,
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
      case "dz":
        src = algeriaRoundedFlag;
        break;
      case "ma":
        src = moroccoRoundedFlag;
        break;
      case "tn":
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
  };

  const updateManager = async () => {
    const id = decodedToken.id;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const endpoint = `${apiUrl}/manager/update/${id}`;
    const response = await axios.put(endpoint, user, { headers });
  };

  const resetPassword = async (values, props) => {
    const { password, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    const id = decodedToken.id;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let endpoint = `${apiUrl}/user/password-reset/${id}`;

    if (roleUser === "manager") {
      endpoint = `${apiUrl}/manager/password-reset/${id}`;
    }
    if (roleUser === "admin") {
      endpoint = `${apiUrl}/admin/password-reset/${id}`;
    }

    try {
      await axios.put(
        endpoint,
        { password, newPassword, confirmPassword },
        { headers }
      );
      setMessage("Mot de passe modifié avec succés");
      props.resetForm();
    } catch (error) {
      props.resetForm();
      setMessage(error.response.data.message);
    }
  };

  const [user, setUser] = useState(null);
  const [roleUser, setRoleUser] = useState("");

  // Fetch the current user only if token exists
  if (token && !user) {
    const fetchUser = async () => {
      
      if (token && !user) {
        const fetchedUser = await fetchCurrentUser(token);

        const decodedToken = decodeToken(token);
        const role = decodedToken.role;
        
        if (fetchedUser) {
          setUser(fetchedUser);
          setRoleUser(role);
        }
      }
    };
    if (token && !user) {
      fetchUser();
    }
  }

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
    //navigate("/payment_dashboard");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const btnStyle = {
    marginTop: 10,
    width: "70%",
    marginLeft: "15%",
    backgroundColor: "#F49E4C",
  };
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const initialValues = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, `${t("password-input-verif")}`)
      .required("Requis"),
    newPassword: Yup.string()
      .min(8, `${t("password-input-verif")}`)
      .required("Requis")
      .matches(passwordRegExp, `${t("password-input-regex")}`),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], `${t("mdp-not-correspond")}`)
      .required("Requis"),
  });

  const deleteUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${apiUrl}/user/delete/${selectedUserToBeDeleted}`,
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
      {user &&
        (console.log(user),
        (
          <Grid
            id="sessionContainer"
            container
            direction="row"
            style={{ overflow: "auto" }}
          >
            <Box sx={{ maxWidth: "75%", mx: "auto" }}>
              <Typography variant="h4" gutterBottom sx={{ marginTop: "30px" }}>
                {isEditing ? "Editer mon profil" : "Mon profil"}
              </Typography>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Nom"
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
                  onClick={openResetPwdDialog}
                  sx={{ backgroundColor: "#F49E4C" }}
                >
                  Modifier le mot de passe
                </Button>
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
                  <Paper sx={{ marginTop: "30px", marginBottom: "60px" }}>
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
                  </Paper>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        ))}
      {/* CHOSE LANGUAGE  */}
      <FlagPopUp
        setLanguage={setLanguage}
        show={show}
        handleClose={handleClose}
      />
      {/* NEW USER MODAL */}
      <NewUserForm
        open={openDialog}
        handleClose={handleCloseDialog}
        usersList={usersList}
        setUsers={setUsers}
      />
      {/* RESET PWD MY ACCOUNT MODAL */}
      <Dialog open={showResetPwdDialog} onClose={closeResetPwdDialog}>
        <DialogTitle>
          Modifier le mot de passe
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeResetPwdDialog}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={resetPassword}
            >
              {(props) => (
                <Form noValidate>
                  <Field
                    className={classes.field}
                    as={TextField}
                    name="password"
                    label="Mot de passe actuel"
                    type="password"
                    fullWidth
                    error={props.errors.password && props.touched.password}
                    helperText={<ErrorMessage name="password" />}
                    required
                  />
                  <Field
                    className={classes.field}
                    as={TextField}
                    name="newPassword"
                    label="Nouveau mot de passe"
                    type="password"
                    fullWidth
                    error={
                      props.errors.newPassword && props.touched.newPassword
                    }
                    helperText={<ErrorMessage name="newPassword" />}
                    required
                  />

                  <Field
                    className={classes.field}
                    as={TextField}
                    name="confirmPassword"
                    label="Confirmer le nouveau mot de passe"
                    type="password"
                    fullWidth
                    error={
                      props.errors.confirmPassword &&
                      props.touched.confirmPassword
                    }
                    helperText={<ErrorMessage name="confirmPassword" />}
                    required
                  />
                  <Grid container direction="row">
                    <Button
                      sx={{ textTransform: "none" }}
                      type="submit"
                      style={btnStyle}
                      variant="contained"
                    >
                      Modifier
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
            {message && <p>{message}</p>}
          </DialogContentText>
        </DialogContent>
      </Dialog>
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

export default Profile;
