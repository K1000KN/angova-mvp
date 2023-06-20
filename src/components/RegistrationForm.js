import React from 'react'
import { Grid, Paper, Button, Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@mui/styles";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
    useNavigate    
} from "react-router-dom";
const theme = createTheme();


const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },

    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },  
    wrapperDialog:{
        display:"flex",
        flexDirection: "column",
        alignItems: 'center',
    },
    field:{
        marginTop:8
    }
}); 
const RegistrationForm = ({open, handleClose}) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const { t } = useTranslation();
    const paperStyle = { padding: '0 15px 40px 15px',display: 'flex', flexDirection: 'column' }
    const btnStyle = { marginTop: 10,width:'70%', marginLeft:"15%", backgroundColor:"#F49E4C"}
    const ageRegExp=/^\d+$/;
    const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    const initialValues = {
        name: '',
        firstname:'',
        age:'',
        email: '',
        password: '',
        confirmPassword:''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, `${t('message-input-verif')}`).required("Requis"),
        firstname: Yup.string().min(3, `${t('message-input-verif')}`).required("Requis"),
        email: Yup.string().email(`${t('email-input-verif')}`).required("Requis"),
        age:Yup.string().matches(ageRegExp,`${t('nb-input-verif')}`),
        password: Yup.string().min(8, `${t('password-input-verif')}`)
        .matches(passwordRegExp,"Password must have one upper, lower case, number").required('Requis'),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Mots de passe ne correspondent pas").required('Requis')
    })
    const onSubmit = (values, props) => {

        alert(JSON.stringify(values), null, 2);
        props.resetForm();
        handleClose();
        navigate("/home");
    }
    

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // Change the size to fit the parent element of this div
            width: '100%',
            height: '100%',
        }}>
            <Dialog fullWidth
                maxWidth="sm" open={open} onClose={handleClose}> 
                <div className={classes.wrapperDialog} >
            
                
                <DialogTitle> 
                    <Typography variant="h6">{t('register-title')}</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {t('register-content')}
                    Pour vous inscrire, contactez-nous au<b> 07.83.97.19.32</b>
                    {/* <Grid>
                        <Paper elevation={0} style={paperStyle}>
                        
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {(props) => (
                                    <Form noValidate >
                                    
                                        <Field className={classes.field} as={TextField} name='name' label={t('input-form-Lname')} fullWidth
                                            error={props.errors.name && props.touched.name}
                                            helperText={<ErrorMessage name='name' />} required />

                                        <Field className={classes.field} as={TextField} name='firstname' label={t('input-form-Fname')} fullWidth
                                            error={props.errors.firstname && props.touched.firstname}
                                            helperText={<ErrorMessage name='firstname' />} required />

                                        <Field className={classes.field} as={TextField} name='age' label='Age' type='number' fullWidth
                                            />

                                        <Field className={classes.field} as={TextField} name='email' label='Email' fullWidth
                                            error={props.errors.email && props.touched.email}
                                            helperText={<ErrorMessage name='email' />} required />

                                        <Field className={classes.field} as={TextField} name='password' label={t('input-form-password')} type='password' fullWidth
                                            error={props.errors.password && props.touched.password}
                                            helperText={<ErrorMessage name='password' />} required />

                                        <Field className={classes.field} as={TextField} name='confirmPassword' label={t('input-form-confirm-password')} type='password' fullWidth
                                            error={props.errors.confirmPassword && props.touched.confirmPassword}
                                            helperText={<ErrorMessage name='confirmPassword' />} required />

                                        <Button   type='submit' style={btnStyle} variant='contained'
                                            >{t('register-button')}</Button>
                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Grid>  */}

                </DialogContent>
                </div>
            </Dialog>
        </div>  
    )
}

export default RegistrationForm;