const { Router } = require("express");
const { Authorization } = require("../../common/guard/authorization.guard");
const profileController = require("./profile.controller");
const router = Router();

router.get("/", Authorization("MEMBER"), profileController.profileMe);

module.exports = { profileRouter: router };
