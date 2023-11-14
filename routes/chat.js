const { Router } = require("express");
const { add } = require("../controllers/chat");

const chatRouter = Router();

chatRouter.post("/add", add);

module.exports = chatRouter;