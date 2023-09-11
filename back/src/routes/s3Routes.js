import express from "express";
import { getAsset } from "../controllers/s3Controller.js";

const router = express.Router();

router.post("/s3", getAsset);
router.post("/bucket", getAsset);
export default router;
