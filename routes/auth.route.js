import express from "express";
import {
  register,
  login,
  logout,
} from "../controllers/auth.controller.js";
import { sendOtp } from "../controllers/sendOtpController.js";
import { verifyOtp } from "../controllers/verifyOtpController.js";
import { resetPassword } from "../controllers/resetPasswordController.js";

const router = express.Router();

// Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// OTP Routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Reset Password Route
router.post("/reset-password", resetPassword);

export default router;
