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
    const classes = useStyles();
    const paperStyle = { padding: '0 15px 40px 15px', width: 414,display: 'flex', flexDirection: 'column' }
    const btnStyle = { marginTop: 10,width:'70%', marginLeft:"15%"}
    const ageRegExp=/^\d+$/;
    const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const initialValues = {
        name: '',
        firstname:'',
        age:'',
        email: '',
        password: '',
        confirmPassword:''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Trop court").required("Required"),
        firstname: Yup.string().min(3, "Trop court").required("Required"),
        email: Yup.string().email("Entrer un email valide").required("Required"),
        age:Yup.string().matches(ageRegExp,"Entrer un nombre"),
        password: Yup.string().min(8, "Le nombre caractères minimum doit être de 8")
        .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol").required('Required'),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Mots de passe ne correspondent pas").required('Required')
    })
    const onSubmit = (values, props) => {

        alert(JSON.stringify(values), null, 2)
        props.resetForm()
    }
    

    return (

        <Dialog fullWidth
            maxWidth="sm" open={open} onClose={handleClose}> 
            <div className={classes.wrapperDialog} >
          
            
            <DialogTitle> 
                <Typography variant="h6">Inscription</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid>
                    <Paper elevation={0} style={paperStyle}>
                      
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {(props) => (
                                <Form noValidate >
                                   
                                    <Field className={classes.field} as={TextField} name='name' label='Nom' fullWidth
                                        error={props.errors.name && props.touched.name}
                                        helperText={<ErrorMessage name='name' />} required />

                                    <Field className={classes.field} as={TextField} name='firstname' label='Prénom' fullWidth
                                        error={props.errors.firstname && props.touched.firstname}
                                        helperText={<ErrorMessage name='firstname' />} required />

                                    <Field className={classes.field} as={TextField} name='age' label='Age' type='number' fullWidth
                                         />

                                    <Field className={classes.field} as={TextField} name='email' label='Email' fullWidth
                                        error={props.errors.email && props.touched.email}
                                        helperText={<ErrorMessage name='email' />} required />

                                    <Field className={classes.field} as={TextField} name='password' label='Mots de passe' type='password' fullWidth
                                        error={props.errors.password && props.touched.password}
                                        helperText={<ErrorMessage name='password' />} required />

                                    <Field className={classes.field} as={TextField} name='confirmPassword' label='Confirmation du Mots de passe' type='password' fullWidth
                                        error={props.errors.confirmPassword && props.touched.confirmPassword}
                                        helperText={<ErrorMessage name='confirmPassword' />} required />

                                    <Button  onClick={handleClose} type='submit' style={btnStyle} variant='contained'
                                        color='primary'>S'inscrire</Button>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                </Grid> 
            </DialogContent>
            </div>
        </Dialog>
       
       
       
       
    )
}

export default RegistrationForm;