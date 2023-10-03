const { Router } = require("express");
const { all } = require("../controllers/user");
const { auth } = require("../middlewares/auth")

const userRouter = Router();

userRouter.get("/", auth, all);

module.exports = userRouter;