const User = require("../models/user");
const Chat = require("../models/chat");
const onConnection = require("../sockets/onConnection")


const add = async (req, res) => {
    if (!req.body) return res.status(401).json({error: "no body"})

    const id = req.user.id;
    const owner = await User.findById(id);
    const { title } = req.body;

    const chat = new Chat({title, owner})
    await chat.save()

    return res.status(201).json({message: "chat successfully created"})
}

const all = async (req, res) => {
    const id = req.user.id;
    const owner = await User.findById(id);

    const chats = await Chat.find({owner})

    return res.status(200).json({chats})
}

const connect = async (req, res) => {
    console.log("Socket successfully created");
    req.io.on('connection', (socket) => {
        onConnection(io, socket)
      })
    req.io.emit("new-message", { content: req.body.content });
    return res.send({ success: true });
}

module.exports = {
    add,
    all,
    connect
}