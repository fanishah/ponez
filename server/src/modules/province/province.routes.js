const { Router } = require("express");
const provinceController = require("./province.controller");
const router = Router();

router.post("/", provinceController.create);
router.get("/", provinceController.findAll);
router.get("/:id", provinceController.findById);
router.delete("/:id", provinceController.removeById);

module.exports = { provinceRouter: router };
