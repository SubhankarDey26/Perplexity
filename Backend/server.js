import dotenv from "dotenv"
import { connectToDb } from "./src/config/database.js"
import app from "./src/app.js"


dotenv.config()
connectToDb()

 app.listen(3000,()=>{
    console.log("Server is running on the PORT 3000")
 })