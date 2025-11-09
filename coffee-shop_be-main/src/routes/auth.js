import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
} from "../app/controllers/AuthController.js";
import { authenticate } from "../app/middleware/auth.js";


const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (cần authentication)
router.get("/me", authenticate, getMe);
router.put("/update", authenticate, updateProfile);
router.put("/change-password", authenticate, changePassword);

export default router;