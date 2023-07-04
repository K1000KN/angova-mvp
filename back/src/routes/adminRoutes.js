import express from "express";
import {
  createAdmin,
  createManager,
  createUserFromAdmin,
  getAdminById,
} from "../controllers/adminController.js";

import { validateAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/createAdmin", createAdmin);
router.post("/admin/createManager", validateAdminToken, createManager);
router.post("/admin/createUser", validateAdminToken, createUserFromAdmin);
router.get("/admin/:id", getAdminById);

export default router;
