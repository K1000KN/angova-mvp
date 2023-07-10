import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent, Typography, Button, Grid, TextField, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CheckCircleOutline, Language, Help, MonetizationOn } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cardElement: {
    margin: '50px 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  logo: {
    width: 'auto',
    height: 78,
    marginBottom: theme.spacing(4),
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: theme.spacing(4),
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease-in-out',
    border: '2px solid transparent',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      borderColor: '#000000',
    },
  },
  selectedCard: {
    borderColor: '#000000',
    backgroundColor: '#A6FFBD'
  },
  button: {
    backgroundColor: '#00000',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#00000',
    },
  },
  requiredField: {
    color: '#FF0000',
    marginLeft: theme.spacing(0.5),
  },
}));

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('L\'email n\'est pas valide').required('L\'email est requis'),
  password: Yup.string().required('Le mot de passe est requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('La confirmation du mot de passe est requise'),
});

const AddUserPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const subscriptionPackages = [
    {
      name: 'Accès 6 mois',
      duration: '6 mois',
      pricePerMonth: 11.32,
      languages: 2,
      support: true,
      totalPrice: 67.92,
    },
    {
      name: 'Accès 1 an',
      duration: '1 an',
      pricePerMonth: 9.25,
      languages: 3,
      support: true,
      totalPrice: 111.0,
    },
  ];

  const handlePackageSelection = (packageIndex) => {
    setSelectedPackageIndex(packageIndex);
  };

  const handleSubmit = async (values) => {
    const { username, email, password } = values;

    if (selectedPackageIndex === null) {
      console.log('Veuillez sélectionner un package');
      return;
    }

    if (!stripe || !elements) {
      console.log('Stripe.js n\'a pas encore chargé.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
       
        const endpoint = `${apiUrl}/manager/create`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(endpoint, { user: { username, email, password }, paymentMethod, selectedPackage: subscriptionPackages[selectedPackageIndex] }, { headers });
        
        console.log(response);
       
      
      if (response.status===201) {
        // L'enregistrement de l'utilisateur et le paiement ont réussi
        console.log('Utilisateur enregistré avec succès.');
      } else {
        // Le paiement a échoué
        console.log('Échec de l\'enregistrement de l\'utilisateur.');
      }
    } else {
      // Une erreur s'est produite lors de la création du paiement avec Stripe
      console.log(error.message);
    }
  };

  const classes = useStyles();
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#000000',
        '::placeholder': {
          color: '#000000',
        },
        border: '1px solid #000000', // Ajoutez les styles de bordure souhaités
        borderRadius: '4px', // Ajoutez les styles de bordure souhaités
        padding: '10px', // Ajoutez les styles de bordure souhaités
      },
    },
  };

  return (
    <div className={classes.container}>
      <img src="./images/logo.png" alt="Logo" className={classes.logo} />

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={classes.form}>
          <Grid container spacing={2}>
            {subscriptionPackages.map((subscriptionPackage, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  variant="outlined"
                  className={`${classes.card} ${selectedPackageIndex === index ? classes.selectedCard : ''}`}
                  onClick={() => handlePackageSelection(index)}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      {subscriptionPackage.name}
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                      <MonetizationOn />
                      <Typography variant="body1" color="text.secondary" style={{ marginLeft: "5px" }}>
                        Prix par mois : {subscriptionPackage.pricePerMonth} €
                      </Typography>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                      <Language />
                      <Typography variant="body1" color="text.secondary" style={{ marginLeft: "5px" }}>
                        Inclus {subscriptionPackage.languages} langues
                      </Typography>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                      <Help />
                      <Typography variant="body1" color="text.secondary" style={{ marginLeft: "5px" }}>
                        Support technique inclus
                      </Typography>
                    </div>
                    </CardContent>
                  {selectedPackageIndex === index && (
                    <IconButton color="primary" aria-label="Selected">
                      <CheckCircleOutline />
                    </IconButton>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
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
          <ErrorMessage name="confirmPassword" component={Typography} variant="body2" color="error" />

          <CardElement options={cardElementOptions} className={classes.cardElement} />

          <Button type="submit" variant="contained" className={classes.button} fullWidth>
            Payer et ajouter l'élève
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUserPage;