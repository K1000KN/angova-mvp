import express from "express";
import { getAudio, getImage } from "../controllers/s3Controller.js";
import {
  validateAdminToken,
  validateManagerToken,
  validateUserToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/s3/image",
  validateAdminToken || validateManagerToken || validateUserToken,
  getImage
);
router.post(
  "/s3/audio",
  validateAdminToken || validateManagerToken || validateUserToken,
  getAudio
);

export default router;
