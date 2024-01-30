const { Router } = require("express");
const categoryController = require("./category.controller");
const { Authorization } = require("../../common/guard/authorization.guard");
const router = Router();

router.post("/", Authorization("MANAGER"), categoryController.create);
router.get("/", categoryController.findAll);
router.get("/:slug", categoryController.findBySlug);
router.delete("/:id", Authorization("MANAGER"), categoryController.remove);
router.patch("/:id", Authorization("MANAGER"), categoryController.update);

module.exports = { categoryRouter: router };
