import React, { useState } from "react";
import { Grid, Paper, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Loader from "./Loader";
const theme = createTheme();

const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  closeButton: {
    position: "absolute !important",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  wrapperDialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    marginTop: 8,
  },
});
const NewUserForm = ({ open, handleClose, usersList, setUsers }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
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

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("email-input-verif")}`)
      .required("Requis"),
    password: Yup.string()
      .min(0, "Le nombre de caractères minimum doit être de 8")
      .required("Requis"),
  });

  const handleSubmit = async (values, props) => {
    const { username, email, password } = values;
    setIsLoading(true);

    try {
      const endpoint = `${apiUrl}/manager/create`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        endpoint,
        { username, email, password },
        { headers }
      );

      if (response.status === 201) {
        const newUsers = [...usersList, values];
        setUsers(newUsers);
        handleClose();
        console.log("User registered successfully.");
      } else {
        console.log("Failed to register user.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Ensure isLoading is set to false after submission
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <div className={classes.wrapperDialog}>
          <DialogTitle>
            {t("Enregistrement")}
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Grid>
              <Paper elevation={0} style={paperStyle}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {(props) => (
                    <Form noValidate>
                      <Field
                        as={TextField}
                        id="username"
                        name="username"
                        label="Nom"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                      />
                      <ErrorMessage
                        name="username"
                        component={Typography}
                        variant="body2"
                        color="error"
                      />

                      <Field
                        as={TextField}
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                      />
                      <ErrorMessage
                        name="email"
                        component={Typography}
                        variant="body2"
                        color="error"
                      />

                      <Field
                        as={TextField}
                        id="password"
                        name="password"
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                      />
                      <ErrorMessage
                        name="password"
                        component={Typography}
                        variant="body2"
                        color="error"
                      />

                      <Field
                        as={TextField}
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirmer le mot de passe"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                      />

                      <Button
                        sx={{ textTransform: "none" }}
                        type="submit"
                        style={btnStyle}
                        variant="contained"
                        disabled={isLoading} // Disable the button during loading
                      >
                        {isLoading ? (
                          <Loader /> // Display the loader
                        ) : (
                          "Ajouter l'élève" // Display the button text
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Grid>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default NewUserForm;
