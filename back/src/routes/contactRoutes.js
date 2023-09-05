import express from "express";
import { contactForm } from "../controllers/contactController.js";
import { contactRegisterForm } from "../controllers/contactRegiController.js";
const router = express.Router();

router.post("/contact/mail", contactForm);
router.post("/contact/register", contactRegisterForm);

export default router;
