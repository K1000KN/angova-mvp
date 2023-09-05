import React, {useState,useEffect} from "react";
import { Grid, Paper, Button, MenuItem } from "@mui/material";
import { TextField, Select } from "@mui/material";
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
const NewUserForm = ({ open, handleClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

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
  
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Set the default role here
    manager: "", // Set the default manager ID here, it can be an empty string or the appropriate default value
    admin: "", // Set the default admin ID here, it can be an empty string or the appropriate default value
  };
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t("message-input-verif")}`)
      .required("Requis"),
    email: Yup.string()
      .email(`${t("email-input-verif")}`)
      .required("Requis"),
    password: Yup.string()
      .min(8, `${t("password-input-verif")}`)
      .matches(
        passwordRegExp,
        `${t("password-input-regex")}`)
      .required("Requis"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mots de passe ne correspondent pas")
      .required("Requis"),
  });



  const [managers, setManagers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const admins = response.data.filter(
        (user) => user.roles[0].name === "admin"
      );

      const managers = response.data.filter(
        (user) => user.roles[0].name === "manager"
      );
      setAdmins(admins);
      setManagers(managers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  const onSubmit = async (values, props) => {

    try {

      const token = localStorage.getItem("token");

      let response;
  
      if (values.role === "manager") {
        response = await axios.post(
          `${apiUrl}/admin/createManager`,
          {
            username: values.name,
            email: values.email,
            password: values.password,
            roles: [values.role],
            admin: values.role === "admin" ? values.admin : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } 
  
      if (values.role === "admin") {
        response = await axios.post(
          `${apiUrl}/admin/create`,
          {
            username: values.name,
            email: values.email,
            password: values.password,
            roles: [values.role],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${apiUrl}/user/create`,
          {
            username: values.name,
            email: values.email,
            password: values.password,
            roles: [values.role],
            managerId: values.role === "user" ? values.manager : undefined,
            adminId: values.role === "manager" ? values.admin : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      if (response.status === 200 || response.status === 201) {
        props.resetForm();     
        // /// await new promise to wait for the resetForm to finish
        // await new Promise((resolve) => setTimeout(resolve, 500));
        // /// refresh the users list
        // fetchAllUsers();
        handleClose();
        window.location.reload();
      } else {
        console.log(response);
       
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
        width: "100%",
        height: "100%",
      }}
    >
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <div className={classes.wrapperDialog}>
          <DialogTitle>{t("Enregistrement")}
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
                        name="name"
                        label={t("nom d'utilisateur")}
                        fullWidth
                        error={props.errors.name && props.touched.name}
                        helperText={<ErrorMessage name="name" />}
                        required
                      />

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
                        as={Select}
                        name="role"
                        label={t("role")}
                        fullWidth
                        error={props.errors.role && props.touched.role}
                        helperText={<ErrorMessage name="role" />}
                        required
                      >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Field> 

                      {props.values.role === "user" && (
                        <Field
                          className={classes.field}
                          as={Select}
                          name="manager"
                          label={t("manager")}
                          fullWidth
                          error={props.errors.manager && props.touched.manager}
                          helperText={<ErrorMessage name="manager" />}
                          required={props.values.role === "user"}
                        >
                          {managers.map((manager) => (
                            <MenuItem key={manager._id} value={manager._id}>
                              {manager.username}
                            </MenuItem>
                          ))}
                        </Field>
                      )}

                      {props.values.role === "manager" && (
                        <Field
                          className={classes.field}
                          as={Select}
                          name="admin"
                          label={t("manager")}
                          fullWidth
                          error={props.errors.manager && props.touched.manager}
                          helperText={<ErrorMessage name="manager" />}
                          required={props.values.role === "manager"}
                        >
                          {admins.map((admin) => (
                            <MenuItem key={admin._id} value={admin._id}>
                              {admin.username}
                            </MenuItem>
                          ))}
                        </Field>
                      )} 

                      <Field
                        className={classes.field}
                        as={TextField}
                        name="password"
                        label={t("mot de passe")}
                        type="password"
                        fullWidth
                        error={props.errors.password && props.touched.password}
                        helperText={<ErrorMessage name="password" />}
                        required
                      />

                      <Field
                        className={classes.field}
                        as={TextField}
                        name="confirmPassword"
                        label={t("confirmer le mot de passe")}
                        type="password"
                        fullWidth
                        error={
                          props.errors.confirmPassword &&
                          props.touched.confirmPassword
                        }
                        helperText={<ErrorMessage name="confirmPassword" />}
                        required
                      />

                      

                      <Button
                        type="submit"
                        
                        style={btnStyle}
                        variant="contained"
                        fullWidth
                        
                      >
                        {t("soumettre")}
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
