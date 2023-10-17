const { Router } = require("express");
const { all, me } = require("../controllers/user");

const userRouter = Router();

userRouter.get("/me", me);
userRouter.get("/", all);

module.exports = userRouter;