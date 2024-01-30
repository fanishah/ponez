const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const httpCodes = require("http-codes");
const categoryMessages = require("./category.messages");

class categoryController {
  #categoryService;
  constructor() {
    autoBind(this);
    this.#categoryService = categoryService;
  }

  async create(req, res, next) {
    const { name, slug, icon, parent } = req.body;
    try {
      await this.#categoryService.create({
        name,
        slug,
        icon,
        parent,
      });

      return res
        .status(httpCodes.CREATED)
        .json({ message: categoryMessages.Created });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const category = await this.#categoryService.findAll();
      return res.status(httpCodes.OK).json(category);
    } catch (err) {
      next(err);
    }
  }

  async findBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const category = await this.#categoryService.findBySlug(slug);
      return res.status(httpCodes.OK).json(category);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      await this.#categoryService.update(id, req.body);

      return res
        .status(httpCodes.OK)
        .json({ message: categoryMessages.Updated });
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#categoryService.remove(id);

      return res
        .status(httpCodes.OK)
        .json({ message: categoryMessages.deleted });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new categoryController();
