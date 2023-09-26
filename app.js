const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res) => {
    req.end("я работаю");

})

async function main() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/messenger");
        app.listen(3000);
        console.log("Сервер подключен")
    } catch(err) {
        return console.log(err);
    }
}

main()