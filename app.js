const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const { signup } = require("./controllers/user")

const app = express();
app.use(cors());
app.use(express.json());

app.post("signup/", signup);

async function main() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/messenger");
        app.listen(3002);
        console.log("Сервер подключен")
    } catch(err) {
        return console.log(err);
    }
}

main()