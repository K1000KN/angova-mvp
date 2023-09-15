import express from "express";
import { getAsset } from "../controllers/s3Controller.js";
import { validateToken } from "../middlewares/authMiddleware.js"; // Removed validateUserToken since it's not needed here

const router = express.Router();

router.post("/s3", validateToken, getAsset);

export default router;
