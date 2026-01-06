import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
  googleLogin, // ✅ ADD THIS
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin); // ✅ GOOGLE OAUTH
router.post("/logout", logout);

// 👤 Profile
router.put("/update-profile", protectRoute, updateProfile);

// ✅ Check auth
router.get("/check", protectRoute, checkAuth);

export default router;
