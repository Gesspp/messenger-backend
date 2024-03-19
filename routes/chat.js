const { Router } = require("express");
const { add, all, connect } = require("../controllers/chat");

const chatRouter = Router();

chatRouter.post("/add", add);
chatRouter.get("/connect", connect);
chatRouter.get("/", all);

module.exports = chatRouter;