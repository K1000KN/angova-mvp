// server/src/routes/userRoutes.js
import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  resetPasswordUser,
  refreshUserToken,
} from "../controllers/userController.js";

import { validateAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/user/create", createUser);
router.get("/user/all", getAllUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);
router.delete("/user/delete/:id", deleteUser);
router.put("/user/password-reset/:id", resetPasswordUser);
router.post("/user/refresh-token", refreshUserToken);
export default router;
