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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import jwt_decode from "jwt-decode";
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

const LoginForm = ({ open, handleClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
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

  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("email-input-verif")}`)
      .required("Requis"),
    password: Yup.string()
      // .min(8,`${t("password-input-verif")}`)
      .required("Requis"),
  });

  const onSubmit = async (values, props) => {
    try {
      let endpoint = `${apiUrl}/auth/login`;
      setIsLoading(true); // Corrected the state name

      const response = await axios.post(endpoint, values);

      // Removed the extra setIsLoading(false) from .then()

      const { token } = response.data;
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;

      localStorage.setItem("token", token);

      props.resetForm();
      if (role === "admin") {
        navigate("/backoffice");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message);
      setIsLoading(false); // Ensure isLoading is set to false on error
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
            {t("loginButton")}
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
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <Form noValidate>
                      <Field
                        className={classes.field}
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        error={props.errors.email && props.touched.email}
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
                        error={props.errors.password && props.touched.password}
                        helperText={<ErrorMessage name="password" />}
                        required
                      />

                      <Button
                        sx={{ textTransform: "none" }}
                        type="submit"
                        style={btnStyle}
                        variant="contained"
                      >
                        {isLoading ? (
                          <Loader size="20px" color="#fff" />
                        ) : (
                          t("loginButton")
                        )}
                      </Button>
                      {error && <Typography color="error">{error}</Typography>}
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

export default LoginForm;
