const { Router } = require("express");
const { all, me, search } = require("../controllers/user");

const userRouter = Router();

userRouter.get("/me", me);
userRouter.get("/search", search);
userRouter.get("/", all);

module.exports = userRouter;