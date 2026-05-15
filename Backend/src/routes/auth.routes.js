import {Router} from "express"
import { registerController,loginController, verifyEmail } from "../controllers/auth.controller.js"
import { registerValidator,loginValidator } from "../validator/auth.validator.js"

const authRouter=Router()

authRouter.post("/register",registerValidator,registerController)

authRouter.get("/verify-email",verifyEmail)
export default authRouter