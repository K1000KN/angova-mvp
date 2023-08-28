import React from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
 
} from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

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
const NewUserForm = ({ open, handleClose, usersList,setUsers  }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const { t } = useTranslation();
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

  const  initialValues={
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("email-input-verif")}`)
      .required("Requis"),
    password: Yup.string()
      .min(0, "Le nombre de caractères minimum doit être de 8")
      .required("Requis"),
  });

  const handleSubmit = async (values) => {  
    const { username, email, password } = values;
    
  
      const endpoint = `${apiUrl}/manager/create`;
      const headers = {
          Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(endpoint,  { username, email, password } , { headers });
      
      console.log(response);
     
    
    if (response.status===201) {
      const newUsers = [...usersList, values];
      setUsers(newUsers);
      handleClose();
      // L'enregistrement de l'utilisateur et le paiement ont réussi
      console.log('Utilisateur enregistré avec succès.');
    } else {
      // Le paiement a échoué
      console.log('Échec de l\'enregistrement de l\'utilisateur.');
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
            Enregistrement
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
                    <ErrorMessage name="username" component={Typography} variant="body2" color="error" />

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
                    <ErrorMessage name="email" component={Typography} variant="body2" color="error" />

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
                    <ErrorMessage name="password" component={Typography} variant="body2" color="error" />

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
                      >
                        Ajouter l'élève
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
