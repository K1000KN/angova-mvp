import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const emailSecretKey = process.env.API_SENDGRID;

sgMail.setApiKey(emailSecretKey);

/// fonction pour log les users
/// return auth & role
export const contactForm = (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: "contact.angova@gmail.com", // Votre adresse e-mail
    from: "contact.angova@gmail.com",
    subject: "contact depuis l'application web",
    text: `Nom: ${name}\nE-mail: ${email}\n\nMessage: ${message}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("E-mail envoyé avec succès");
      res.status(200).json({ message: "E-mail envoyé avec succès" });
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de l'envoi de l'e-mail",
        error
      );
      res.status(500).json({
        message: "Une erreur s'est produite lors de l'envoi de l'e-mail",
      });
    });
};
