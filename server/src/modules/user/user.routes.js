const { Router } = require("express");
const userController = require("./user.controller");
const { Authorization } = require("../../common/guard/authorization.guard");
const router = Router();

router.post("/", Authorization("ADMIN"), userController.create);
router.get("/", Authorization("ADMIN"), userController.findAll);
router.get("/:mobile", Authorization("ADMIN"), userController.findByMobile);
router.delete(
  "/:mobile",
  Authorization("ADMIN"),
  userController.removeByMobile
);
router.patch("/:mobile", Authorization("MEMBER"), userController.updateByMobile);

module.exports = { userRouter: router };
