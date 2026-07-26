// it acts as a middleware that checks if there's an error eg. name not given or any field is emty then then it stop there only.
import { body, validationResult } from "express-validator";

const validateResults = async(req,res,next)=>{
    // Extracts the validation errors of an express request
    const errors = validationResult(req);
    // true if there are no errors, false otherwise
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg 
        });
    }
    next();
}

// .notEmpty() Adds a validator to check if a value is not empty; that is, a string with length of 1 or more.
// the message, which can be any value, or a function for dynamically creating the error message based on the field value
// Sets the error message for the previous validator.
export const validateSignup = [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({
        min:3,max:30
    }).withMessage("Name must be between 3 and 30 characters long"),
    
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Please use a valid email address.").normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required").isLength({
        min:6
    }).withMessage("Password must be at least 6 characters long"),

    validateResults 
];

export const validateLogin = [
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
    
    body("password").notEmpty().withMessage("Password is required"),
    validateResults
];