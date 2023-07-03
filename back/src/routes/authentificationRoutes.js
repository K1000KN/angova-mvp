import express from "express";
import {
    login,
    refreshToken,
}
from "../controllers/AuthentificationController.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/refresh-token", refreshToken);

export default router;
