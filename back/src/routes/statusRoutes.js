import express from "express";
import { getServerStatus } from "../controllers/statusController.js";

const router = express.Router();

router.get("/status", getServerStatus);

export default router;
