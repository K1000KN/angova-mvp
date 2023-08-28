import express from "express";
import {
  createUser,
  getManagerById
} from "../controllers/managerController.js";
import { validateManagerToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/manager/create", validateManagerToken, createUser);
router.get("/manager/:id",  getManagerById);

export default router;
