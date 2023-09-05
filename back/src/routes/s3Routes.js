import express from "express";
import { getImage } from "../controllers/s3Controller.js";

const router = express.Router();

router.get("/s3", getImage);

export default router;
