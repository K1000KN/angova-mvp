import React from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
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
    position: "absolute",
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
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    email: "",
    password: "",
    isAdmin: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("email-input-verif")}`)
      .required("Requis"),
    password: Yup.string()
      .min(0, "Le nombre caractères minimum doit être de 8")
      .required("Requis"),
    isAdmin: Yup.boolean().required("Requis"), // Added validation for isAdmin field
  });

  const onSubmit = async (values, props) => {
    try {
      let endpoint = "";

      if (values.isAdmin === true) {
        endpoint = "http://localhost:3001/api/v1/admin/login";
      } else {
        endpoint = "http://localhost:3001/api/v1/user/login";
      }

      const response = await axios.post(endpoint, values);
      const { token } = response.data;

      // Store the token and isAdmin in local storage
      localStorage.setItem("token", token);

      props.resetForm();

      if (values.isAdmin) {
        navigate("/backoffice");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error state or display an error message
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Change the size to fit the parent element of this div
        width: "100%",
        height: "100%",
      }}
    >
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <div className={classes.wrapperDialog}>
          <DialogTitle>
            <Typography variant="h6">{t("loginButton")}</Typography>
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

                      <FormControlLabel
                        className={classes.field}
                        control={
                          <Field
                            as={Checkbox}
                            name="isAdmin"
                            checked={props.values.isAdmin}
                          />
                        }
                        label={t("vous êtes un admin?")}
                      />

                      <Button
                        sx={{ textTransform: "none" }}
                        type="submit"
                        style={btnStyle}
                        variant="contained"
                      >
                        {t("loginButton")}
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

export default LoginForm;
