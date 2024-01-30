const { Router } = require("express");
const { Authorization } = require("../../common/guard/authorization.guard");
const postController = require("./post.controller");
const router = Router();
const multer = require("multer");
const diskStorageMulter = require("../../common/exception/diskStorageMulter");

const upload = multer({ storage: diskStorageMulter });

router.post(
  "/",
  Authorization("MEMBER"),
  upload.array("photos", 12),
  postController.craete
);
router.get("/", postController.findAll);
router.get("/search", postController.findAllByCityAndState);
router.get("/:id", postController.findById);
router.delete("/:id", Authorization("MEMBER"), postController.remove);
router.patch("/:id", Authorization("MEMBER"), postController.update);
module.exports = { postRouter: router };
