import {Router} from "express"
import { registerController,loginController } from "../controllers/auth.controller.js"
import { registerValidator,loginValidator } from "../validator/auth.validator.js"

const authRouter=Router()

authRouter.post("/register",registerValidator,registerController)


export default authRouter