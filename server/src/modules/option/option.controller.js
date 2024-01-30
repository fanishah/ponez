const autoBind = require("auto-bind");
const optionService = require("./option.service");
const httpCodes = require("http-codes");
const optionMessages = require("./option.messages");

class optionController {
  #optionService;
  constructor() {
    autoBind(this);
    this.#optionService = optionService;
  }

  async create(req, res, next) {
    try {
      await this.#optionService.create(req.body);
      return res
        .status(httpCodes.CREATED)
        .json({ message: optionMessages.Created });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const options = await this.#optionService.findAll();
      return res.status(httpCodes.OK).json({ options });
    } catch (err) {
      next(err);
    }
  }

  async findByCategoryId(req, res, next) {
    try {
      const { categoryid } = req.params;
      const options = await this.#optionService.findByCategoryId(categoryid);
      return res.status(httpCodes.OK).json({ options });
    } catch (err) {
      next(err);
    }
  }

  async removeByCategoryId(req, res, next) {
    try {
      const { categoryid } = req.params;
      await this.#optionService.removeByCategoryId(categoryid);
      return res
        .status(httpCodes.OK)
        .json({ message: optionMessages.DeleteByCategoryId });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      await this.#optionService.update(id, req.body);

      return res.status(httpCodes.OK).json({ message: optionMessages.Updated });
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#optionService.remove(id);

      return res.status(httpCodes.OK).json({ message: optionMessages.Delete });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new optionController();
