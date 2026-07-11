import { signup,login } from "../controllers/authController.js";
import { validateLogin,validateSignup } from "../middlewares/authValidation.js";
import express from "express";

const router = express.Router();
router.post('/register',validateSignup,signup);
router.post('/login',validateLogin,login);
export default router;