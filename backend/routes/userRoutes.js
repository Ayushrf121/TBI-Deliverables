import { signup,login, googleController } from "../controllers/authController.js";
import { validateLogin,validateSignup } from "../middlewares/authValidation.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";
import express from "express";

const router = express.Router();
router.post('/register',loginLimiter,validateSignup,signup);
router.post('/login',loginLimiter,validateLogin,login);
router.post("/googleAuth",loginLimiter, googleController);
export default router;