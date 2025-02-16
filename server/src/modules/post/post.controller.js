const autoBind = require("auto-bind");
const postService = require("./post.service");
const httpCodes = require("http-codes");
const postMessages = require("./post.messages");

class postController {
  #postService;
  constructor() {
    autoBind(this);
    this.#postService = postService;
  }

  async craete(req, res, next) {
    try {
      req.body.userid = req.user._id;
      delete req.body.status;
      const ss = await this.#postService.create(req.body, req.files);
      return res
        .status(httpCodes.CREATED)
        .json({ message: postMessages.Craeted });
    } catch (err) {
      next(err);
    }
  }
  async findAll(req, res, next) {
    try {
      const posts = await this.#postService.findAll();
      return res.status(httpCodes.OK).json(posts);
    } catch (err) {
      next(err);
    }
  }

  async findAllByCityAndProvince(req, res, next) {
    try {
      const posts = await this.#postService.findAllByCityAndProvince(req.query);
      return res.status(httpCodes.OK).json(posts);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const posts = await this.#postService.findById(id);
      return res.status(httpCodes.OK).json(posts);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const posts = await this.#postService.update(id, req.body, req.user);
      return res.status(httpCodes.OK).json({ message: postMessages.Updated });
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#postService.remove(id, req.user);
      return res.status(httpCodes.OK).json({ message: postMessages.Deleted });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new postController();
