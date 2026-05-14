import { body, validationResult } from "express-validator"


// Register validation rules
export const registerValidator = [

    // Username validation
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters")
        .isLength({ max: 30 })
        .withMessage("Username cannot exceed 30 characters"),

    
    // Email validation
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),


    // Password validation
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),


    // Handle validation errors
    (req, res, next) => {

        const errors = validationResult(req)

        // If validation fails
        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: errors.array()
            })
        }

        next()
    }
]



// Login validation rules
export const loginValidator = [

    // Email validation
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),


    // Password validation
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),


    // Handle validation errors
    (req, res, next) => {

        const errors = validationResult(req)

        // If validation fails
        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: errors.array()
            })
        }

        next()
    }
]