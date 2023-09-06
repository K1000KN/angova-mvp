import React from "react";
import { Grid, Paper, Button, Typography} from "@mui/material";
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

const apiUrl = process.env.REACT_APP_API_URL;

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
const RegistrationForm = ({ open, handleClose }) => {
  // const navigate = useNavigate();
  const classes = useStyles();
  const { t } = useTranslation();
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
    firstname: "",
    nameAuto: "",
    email: ""
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t("message-input-verif")}`)
      .required("Requis"),
    nameAuto: Yup.string()
      .min(3, `${t("message-input-verif")}`)
      .required("Requis"),
    firstname: Yup.string()
      .min(3, `${t("message-input-verif")}`)
      .required("Requis"),
    email: Yup.string()
      .email(`${t("email-input-verif")}`)
      .required("Requis"),
    
  });
  const handleSubmit = async (values, props) => {

    axios.post(`${apiUrl}/contact/register`, values)
    .then(response => {
      //console.log(response);
      
      props.resetForm();
    })
    .catch(error => {
      // La requête a échoué
      console.error(error);
     
    });
    props.resetForm()
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
            <Typography variant="h6">{t("register-title")}</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {t("register-content")}
            <br />
            <br />

            <Grid>
              <Paper elevation={0} style={paperStyle}>
              
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {(props) => (
                        <Form noValidate >
                          <Field
                            as={TextField}
                            id="name"
                            name="name"
                            label={t('input-form-Lname')}
                            className={classes.field}
                            fullWidth
                            required
                          />
                          <ErrorMessage
                            name="name"
                            component={Typography}
                            variant="body2"
                            color="error"
                          />
                         
                          <Field
                            as={TextField}
                            id="firstname"
                            name="firstname"
                            label={t('input-form-Fname')}
                            className={classes.field}
                            fullWidth
                            required
                          />
                          <ErrorMessage
                            name="firstname"
                            component={Typography}
                            variant="body2"
                            color="error"
                          />
                          
                          <Field
                            as={TextField}
                            id="nameAuto"
                            name="nameAuto"
                            label={t('input-form-auto-name')}
                            className={classes.field}
                            fullWidth
                            required
                          />
                          <ErrorMessage
                            name="nameAuto"
                            component={Typography}
                            variant="body2"
                            color="error"
                          />
                          
                          <Field
                            as={TextField}
                            id="Email"
                            name="email"
                            label={t('input-form-mail')}
                            className={classes.field}
                            fullWidth
                            required
                          />
                          <ErrorMessage
                            name="email"
                            component={Typography}
                            variant="body2"
                            color="error"
                          />
                          

                          <Button
                            sx={{ textTransform: "none" }}
                            type="submit"
                            style={btnStyle}
                            variant="contained"
                          >
                            {t('register-button')}
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

export default RegistrationForm;


