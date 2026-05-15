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

        const emailVerificatioToken=jwt.sign({
            email:user.email
        },process.env.JWT_SECRET)


// Create Verification Link
const verificationLink = `http://localhost:8000/api/auth/verify-email/${emailVerificatioToken}`


// Send Verification Email
await sendEmail({

    to: email,

    subject: "Verify Your Email",

    text: `Click this link to verify your email: ${verificationLink}`,

    html: `

        <h2>Welcome ${username}</h2>

        <p>
            Please verify your email by clicking the button below.
        </p>

        <a 
            href="${verificationLink}"
            style="
                background:black;
                color:white;
                padding:10px 20px;
                text-decoration:none;
                border-radius:5px;
                display:inline-block;
            "
        >
            Verify Email
        </a>

        <br><br>

        <p>
            Or copy this link:
        </p>

        <p>
            ${verificationLink}
        </p>
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

        // User not found
        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Check if email verified
        if (!user.verified) {

            return res.status(401).json({
                success: false,
                message: "Please verify your email before login"
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


//email verififcation
export async function verifyEmail(req, res) {

    try {

        const { token } = req.params

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            email: decoded.email
        })

        if (!user) {

            return res.status(404).json({
                message: "Invalid Token",
                success: false,
                err: "User Not found"
            })
        }

        // already verified
        if (user.verified) {

            return res.send(`
                <h1>Email Already Verified</h1>
                <p>You can login now.</p>
            `)
        }

        user.verified = true

        await user.save()

        return res.send(`
            <h1>Email Verified Successfully ✅</h1>
            <p>Your email has been verified. You can now login.</p>
        `)

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Invalid or Expired Token",
            error: error.message
        })
    }
}


//Get Current Loged In User Details
export async function GetMe(req,res)
{
    const userId=req.user.id

    const user=await userModel.findById(userId).select("-password")


    if(!user)
    {
        return res.status(404).json({
            message:"user Not Found",
            success:false,
            err:"User Not Found"
        })
    }

    res.status(200).json({
        message:"user details fetched Successfully",
        success:true,
        user
    })
}
