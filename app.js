const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const { createServer }  = require("http");
const { Server } = require("socket.io");
const userRouter = require("./routes/user")
const chatRouter = require("./routes/chat")
const { auth } = require("./middlewares/auth")

const { signup, signin } = require("./controllers/user")

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app)
const io = new Server(server, {
  cors: "*",
  serveClient: false
})

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.post("/signup", signup);
app.post("/signin", signin);

app.use(auth);

app.use("/users", userRouter);

app.use("/chats", chatRouter);


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