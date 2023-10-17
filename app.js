const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
// const io = require("socket.io");
const userRouter = require("./routes/user")
const { auth } = require("./middlewares/auth")

const { signup, signin } = require("./controllers/user")

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", signup);
app.post("/signin", signin);

app.use(auth);

app.use("/users", userRouter);

// let socket = new WebSocket("");


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

// io.on("connection", (socket) => {
//     socket.on("message", (message) => {
//         console.log(message)
//     })
//     socket.emit("message", "Hello!")
// })