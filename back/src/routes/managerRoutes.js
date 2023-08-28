import express from "express";
import {
  createUser,
  deleteManager,
  updateManager,
 // resetPasswordManager,
  getManagerById
} from "../controllers/managerController.js";
import { validateManagerToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/manager/create", validateManagerToken, createUser);

router.get("/manager/:id",  getManagerById);
router.put("/manager/update/:id", updateManager);
//router.put("/manager/password-reset/:id", resetPasswordManager);
router.delete("/manager/delete/:id", deleteManager);
export default router;
