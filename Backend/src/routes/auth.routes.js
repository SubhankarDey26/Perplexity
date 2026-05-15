import {Router} from "express"
import { registerController,loginController, verifyEmail,GetMe } from "../controllers/auth.controller.js"
import { registerValidator,loginValidator } from "../validator/auth.validator.js"
import { authUser } from "../middleware/auth.middleware.js"


const authRouter=Router()

authRouter.post("/register",registerValidator,registerController)

authRouter.post("/login",loginValidator,loginController)

authRouter.get("/verify-email/:token", verifyEmail)


authRouter.get("/get-me",authUser,GetMe)

export default authRouter
