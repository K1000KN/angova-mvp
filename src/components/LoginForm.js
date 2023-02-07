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
const LoginForm = ({open, handleClose}) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const paperStyle = { padding: '0 15px 40px 15px', display: 'flex', flexDirection: 'column' }
    const btnStyle = { marginTop: 10,width:'70%', marginLeft:"15%", backgroundColor:"#F49E4C"}

    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({

        email: Yup.string().email("Entrer un email valide").required("Requis"),
        password: Yup.string().min(8, "Le nombre caractères minimum doit être de 8").required("Requis"),
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
                    <Typography variant="h6">Connexion</Typography>
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
                                    
                                        

                                        <Field className={classes.field} as={TextField} name='email' label='Email' fullWidth
                                            error={props.errors.email && props.touched.email}
                                            helperText={<ErrorMessage name='email' />} required />

                                        <Field className={classes.field} as={TextField} name='password' label='Mot de passe' type='password' fullWidth
                                            error={props.errors.password && props.touched.password}
                                            helperText={<ErrorMessage name='password' />} required />
                                    
                                        <Button sx={{textTransform: "none"}} type='submit' style={btnStyle} variant='contained'
                                        >Connexion</Button>
                                        
                                    
                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Grid> 
                </DialogContent>
                </div>
            </Dialog>
        </div>
    )
}

export default LoginForm;