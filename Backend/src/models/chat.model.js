import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    // Owner of the chat
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Chat title
    title: {
      type: String,
      required: [true, "Chat title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    }
  },
  {
    timestamps: true
  }
)

const Chat = mongoose.model("Chat", chatSchema)

export default Chat