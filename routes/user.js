const { Router } = require("express");
const { all } = require("../controllers/user");

const userRouter = Router();

userRouter.get("/", all);

module.exports = userRouter;