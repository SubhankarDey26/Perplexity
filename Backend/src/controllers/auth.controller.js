import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"


// Generate JWT Token
const generateToken = (userId) => {

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
}




// Register Controller
export async function registerController(req, res) {

    try {

        const { username, email, password } = req.body


        // Check existing user
        const isUserAlreadyExist = await userModel.findOne({
            $or: [{ email }, { username }]
        })


        if (isUserAlreadyExist) {

            return res.status(409).json({
                success: false,
                message: "User with this email or username already exists"
            })
        }


        // Create user
        const user = await userModel.create({
            username,
            email,
            password
        })


        // Generate JWT token
        const token = generateToken(user._id)


        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        // Send welcome email
        await sendEmail({
            to: email,
            subject: "Welcome to Perplexity Clone 🚀",
            text: `Hello ${username}, your account has been created successfully.`,
            html: `
                <h2>Welcome ${username}</h2>
                <p>Your account has been created successfully.</p>
            `
        })


        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                verified: user.verified
            }
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}





// Login Controller
export async function loginController(req, res) {

    try {

        const { email, password } = req.body


        // Find user
        const user = await userModel.findOne({ email })


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        // Compare password
        const isPasswordMatched = await user.comparePassword(password)


        if (!isPasswordMatched) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }


        // Generate token
        const token = generateToken(user._id)


        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}