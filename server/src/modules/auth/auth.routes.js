const { Router } = require("express");
const authController = require("./auth.controller");
const { Authorization } = require("../../common/guard/authorization.guard");
const router = Router();

router.post("/sendotp", authController.sendOTP);
router.post("/checkotp", authController.checkOTP);
router.get("/refreshtoken", authController.refreshToken);
router.get("/logout", Authorization("MEMBER"), authController.logout);

module.exports = { authRouter: router };
