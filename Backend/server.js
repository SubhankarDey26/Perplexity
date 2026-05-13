import dotenv from "dotenv"
import { connectToDb } from "./src/config/database.js"
import app from "./src/app.js"

dotenv.config()

const PORT = process.env.PORT || 3000


async function startServer() {

    try {

        await connectToDb()

        app.listen(PORT, () => {

            console.log(`Server is running on PORT ${PORT}`)
        })

    } catch (error) {

        console.log("Server Startup Error:", error.message)
    }
}

startServer()