import express from "express";
import { getAsset } from "../controllers/s3Controller.js";
import {
  validateAdminToken,
  validateManagerToken,
  validateUserToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/s3",
  validateAdminToken || validateManagerToken || validateUserToken,
  getAsset
);

export default router;
