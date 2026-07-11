import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt';
import userModel from "../models/userModel.js"; 

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "User doesn't exist" });
                }
                if (!user.password || user.provider !== "local") {
                    return done(null, false, { 
                        message: `This account uses ${user.provider} sign-in. Please log in with Google.` 
                    });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: "Incorrect Password. Please retry!" });
                }
                
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;
