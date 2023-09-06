import React from 'react'
import { Paper, Button } from '@mui/material'
import { TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from "@mui/styles";
import { useTranslation } from 'react-i18next';
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles({
    field: {
        marginTop:'6%',
    },
   
});
const RegistrationForm = ({open, handleClose}) => {
    const { t } = useTranslation();
    
    const classes = useStyles();
    const paperStyle = { backgroundColor: "#F49E4C", padding: '40px 45px', width: "80%",display: 'flex', flexDirection: 'column' }
    const btnStyle = {
        width:'70%', 
        marginLeft:"15%",
        backgroundColor:"#FFFF", 
        color:"#F49E4C", 
        marginTop: 20
    }

    const initialValues = {
        name: '',
        email: '',
        message: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email(`${t('email-input-verif')}`).required("Required"),
        message: Yup.string().min(3,`${t('message-input-verif')}`).required("Required"),

    })
    const onSubmit = (values, props) => {

        axios.post(`${apiUrl}/contact/mail`, values)
        .then(response => {
          // La requête a réussi
          
          props.resetForm();
        })
        .catch(error => {
          // La requête a échoué
          console.error(error);
         
        });
        props.resetForm()
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
            <Paper elevation={0} style={paperStyle}>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form noValidate >
                            
                            <Field className={classes.field} as={TextField} name='name' variant="filled" label={t('input-form-name')} fullWidth
                                error={props.errors.name && props.touched.name}
                                color="warning"
                                InputLabelProps={{
                                    style: {
                                        color: '#FFFF'
                                    } 
                                }}
                                InputProps={{
                                    style: {
                                        color: '#FFFF'
                                    } 
                                }}
                            
                            />                                  

                            <Field className={classes.field} as={TextField} variant="filled" name='email' label='Email' fullWidth
                                error={props.errors.email && props.touched.email} 
                                helperText={<ErrorMessage name='email' />} required 
                                color="warning"
                                InputLabelProps={{
                                    style: {
                                        color: '#FFFF'
                                    } 
                                }}
                                InputProps={{
                                    style: {
                                        color: '#FFFF'
                                    } 
                                }}
                            />

                            <Field className={classes.field} as={TextField} name='message' label='Message' multiline variant="filled"
                                rows={6}
                                color="warning"
                                maxRows={4} fullWidth
                                error={props.errors.message && props.touched.message}
                                helperText={<ErrorMessage name='message' />} required 
                                InputLabelProps={{
                                    style: {
                                        color: '#FFFF'
                                    } 
                                }}
                                InputProps={{
                                    style: {
                                        color: '#FFFF'
                                    } 
                                }}
                            />

                            <Button  onClick={handleClose} sx={{ boxShadow: 0}} type='submit' style={btnStyle} variant='contained'
                               > {t('input-form-send')}</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
            
        </div>
 
    )
}

export default RegistrationForm;