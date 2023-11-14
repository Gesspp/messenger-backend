const User = require("../models/user");
const Chat = require("../models/chat");


const add = async (req, res) => {
    if (!req.body) return res.status(401).json({error: "no body"})

    const id = req.user.id;
    const owner = await User.findById(id);
    const { title } = req.body;

    const chat = new Chat({title, owner})
    await chat.save()

    return res.status(201).json({message: "chat successfully created"})
}

const getChat = async (req, res) => {
    const id = req.user.id;
    const owner = await User.findById(id);

    const chats = await Chat.find({owner})

    return res.status(200).json({chats})
}

module.exports = {
    add,
    getChat
}