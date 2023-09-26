const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname : {
        type: String,
        minLength: 2,
        maxLength: 50
    },
    password : String,
    email : {
        type: String,
        minLength: 5,
        maxLength: 100
    },
})

module.exports = mongoose.model("User", userSchema)