const { Router } = require("express");
const cityController = require("./city.controller");

const router = Router();

router.post("/", cityController.create);
router.get("/", cityController.findAll);
router.get("/:id", cityController.findById);
router.delete("/:id", cityController.removeById);

module.exports = { cityRouter: router };
