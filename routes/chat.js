const { Router } = require("express");
const { add, all } = require("../controllers/chat");
const chat = require("../models/chat");

const chatRouter = Router();

chatRouter.post("/add", add);
chatRouter.get("/", all);

module.exports = chatRouter;