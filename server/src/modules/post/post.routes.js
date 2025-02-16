const { Router } = require("express");
const { Authorization } = require("../../common/guard/authorization.guard");
const postController = require("./post.controller");
const router = Router();
const { uploadFile } = require("../../common/utils/multer");

router.post(
  "/",
  Authorization("MEMBER"),
  uploadFile.array("photos", 10),
  postController.craete
);
router.get("/", postController.findAll);
router.get("/search", postController.findAllByCityAndProvince);
router.get("/:id", postController.findById);
router.delete("/:id", Authorization("MEMBER"), postController.remove);
router.patch("/:id", Authorization("MEMBER"), postController.update);
module.exports = { postRouter: router };
