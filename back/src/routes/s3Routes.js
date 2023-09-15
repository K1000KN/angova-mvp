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

  getAsset
);

export default router;
