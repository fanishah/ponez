const { Router } = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const { categoryRouter } = require("./modules/category/category.routes");
const { optionRouter } = require("./modules/option/option.routes");
const { userRouter } = require("./modules/user/user.routes");
const { profileRouter } = require("./modules/profile/profile.routes");
const { postRouter } = require("./modules/post/post.routes");
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/options", optionRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/profiles", profileRouter);
mainRouter.use("/posts", postRouter);

mainRouter.get("/", (req, res) => {
  res.redirect("/swagger");
});

module.exports = mainRouter;
