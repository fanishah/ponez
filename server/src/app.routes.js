const { Router } = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const { categoryRouter } = require("./modules/category/category.routes");
const { optionRouter } = require("./modules/option/option.routes");
const { userRouter } = require("./modules/user/user.routes");
const { profileRouter } = require("./modules/profile/profile.routes");
const { postRouter } = require("./modules/post/post.routes");
const { provinceRouter } = require("./modules/province/province.routes");
const { cityRouter } = require("./modules/city/city.routes");
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/options", optionRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/profiles", profileRouter);
mainRouter.use("/posts", postRouter);
mainRouter.use("/provinces", provinceRouter);
mainRouter.use("/city", cityRouter);

mainRouter.get("/", (req, res) => {
  res.json({});
});

module.exports = mainRouter;
