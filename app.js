const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const userRouter = require("./routes/user")

const { signup, signin } = require("./controllers/user")

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", signup);
app.post("/signin", signin);

app.use(userRouter);

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