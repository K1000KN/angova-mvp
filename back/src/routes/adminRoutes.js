import express from "express";
import {
  createAdmin,
  createManager,
  createUserFromAdmin,
  getAdminById,
  testApi,
  resetPasswordAdmin
} from "../controllers/adminController.js";

import { validateAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/admin/test", testApi);
router.put("/admin/password-reset/:id", resetPasswordAdmin);
router.post("/admin/createAdmin", createAdmin);
router.post("/admin/createManager", validateAdminToken, createManager);
router.post("/admin/createUser", validateAdminToken, createUserFromAdmin);
router.get("/admin/:id", getAdminById);

export default router;
