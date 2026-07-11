import passport from "passport";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
function generateToken(user) {
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    return token
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleController = async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const {
            name, email, email_verified, sub
        } = payload;
        if (!email_verified) {
            return res.status(403).json({
                success: false,
                message: "Credentials are not verified by google."
            })
        }
        let existingUser = await userModel.findOne({ email });
        if (existingUser && existingUser.provider !== "google") {
            return res.status(400).json({
                success: false,
                message: "This email is registered with password login. Please enter your password."
            });
        }

        if (!existingUser) {
            existingUser = await userModel.create({
                name, email, password: null, email_verified, sub, provider: "google"
            });
        }
        const token = generateToken(existingUser);
        return res.status(200).json({
            success: true,
            message: "User verified!",
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await userModel.create({
            name, email, password: passwordHash, provider: "local"
        });
        return res.status(200).json({
            success: true,
            message: "Signup Successfull"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        if (!user) {
            return res.status(400).json({ success: false, message: info.message });
        }
        const token = generateToken(user);
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });
    })(req, res, next);
}