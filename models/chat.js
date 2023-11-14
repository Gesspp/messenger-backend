const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    title : {
        type: String,
        minLength: 2,
        maxLength: 50
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Chat", chatSchema)