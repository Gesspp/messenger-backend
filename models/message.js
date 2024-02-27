const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    messageType: {
        type: String,
        required: true
    },
    textOrPathToFile: {
        type: String,
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userName: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Chat", chatSchema)