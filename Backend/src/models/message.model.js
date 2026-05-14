import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    // Which chat this message belongs to
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true
    },

    // Message content
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true
    },

    // Sender type
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true
    }
  },
  {
    timestamps: true
  }
)

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel