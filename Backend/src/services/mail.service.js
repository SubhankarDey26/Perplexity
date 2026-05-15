import nodemailer from "nodemailer"
import { google } from "googleapis"


// Create OAuth2 Client
const OAuth2 = google.auth.OAuth2


const oauth2Client = new OAuth2(

    process.env.GOOGLE_CLIENT_ID,

    process.env.GOOGLE_CLIENT_SECRET,

    "https://developers.google.com/oauthplayground"
)



// Debug Logs
// console.log("====================================")
// console.log("GOOGLE CLIENT ID:", process.env.GOOGLE_CLIENT_ID)
// console.log("GOOGLE CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET)
// console.log("GOOGLE REFRESH TOKEN:", process.env.GOOGLE_REFRESH_TOKEN)
// console.log("GOOGLE USER:", process.env.GOOGLE_USER)
// console.log("====================================")




// Set Credentials
oauth2Client.setCredentials({

    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})




// Send Email Function
export async function sendEmail({
    to,
    subject,
    html,
    text
}) {

    try {

        // Generate Access Token
        const accessTokenResponse = await oauth2Client.getAccessToken()


        // console.log("====================================")
        // console.log("ACCESS TOKEN RESPONSE:", accessTokenResponse)
        // console.log("====================================")


        const accessToken = accessTokenResponse?.token


        // Check token existence
        if (!accessToken) {

            throw new Error("Failed to generate access token")
        }



        // Create Transporter
        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                type: "OAuth2",

                user: process.env.GOOGLE_USER,

                clientId: process.env.GOOGLE_CLIENT_ID,

                clientSecret: process.env.GOOGLE_CLIENT_SECRET,

                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,

                accessToken
            }
        })




        // Verify transporter connection
        transporter.verify((error, success) => {

            if (error) {

                console.log("Transporter Verification Error:", error.message)

            } else {

                console.log("Transporter is ready")
            }
        })




        // Mail options
        const mailOptions = {

            from: process.env.GOOGLE_USER,
            to,
            subject,
            html,
            text
        }



        // console.log("====================================")
        // console.log("SENDING EMAIL TO:", to)
        // console.log("====================================")




        // Send Email
        const details = await transporter.sendMail(mailOptions)



        // console.log("====================================")
        // console.log("EMAIL SENT SUCCESSFULLY")
        // console.log("MESSAGE ID:", details.messageId)
        // console.log("====================================")



        return details

    } catch (error) {

        console.log("====================================")
        console.log("EMAIL SERVICE ERROR")
        console.log(error)
        console.log("====================================")

        throw error
    }
}
