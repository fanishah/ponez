const { Router } = require("express");
const optionController = require("./option.controller");
const { Authorization } = require("../../common/guard/authorization.guard");
const router = Router();

router.post("/", Authorization("MANAGER"), optionController.create);
router.get("/", optionController.findAll);
router.get("/:categoryid", optionController.findByCategoryId);
router.delete(
  "/category/:categoryid",
  Authorization("MANAGER"),
  optionController.removeByCategoryId
);
router.delete("/:id", Authorization("MANAGER"), optionController.remove);
router.patch("/:id", Authorization("MANAGER"), optionController.update);

module.exports = { optionRouter: router };
