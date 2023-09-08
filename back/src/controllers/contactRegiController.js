import sgMail from '@sendgrid/mail';

const emailSecretKey = process.env.API_SENDGRID;

sgMail.setApiKey(emailSecretKey);

/// fonction pour log les users
/// return auth & role
export const contactRegisterForm =  (req, res) => {
    const { name, firstname, nameAuto, email} = req.body;

    const msg = {
        to: 'contact.angova@gmail.com', // Votre adresse e-mail
        from:  'contact.angova@gmail.com',
        subject: "contact depuis l'application web",
        text: `Nom: ${name}\n
        Prénom: ${firstname}\n
        Auto-école: ${nameAuto}\n
        E-mail :  ${email}
        `,
    };

    sgMail
        .send(msg)
        .then(() => {
        console.log('E-mail envoyé avec succès');
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
        })
        .catch((error) => {
        console.error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail' });
        });
};