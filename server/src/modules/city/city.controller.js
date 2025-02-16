const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const cityService = require("./city.service");
const cityMessages = require("./city.messages");

class cityController {
  #cityService;
  constructor() {
    autoBind(this);
    this.#cityService = cityService;
  }

  async create(req, res, next) {
    try {
      const { name, provinceId } = req.body;
      await this.#cityService.create({ name, provinceId });
      return res
        .status(httpCodes.CREATED)
        .json({ message: cityMessages.Created });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const city = await this.#cityService.findAll();
      return res.status(httpCodes.OK).json({ city });
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const city = await this.#cityService.findByid(id);
      return res.status(httpCodes.OK).json({ city });
    } catch (err) {
      next(err);
    }
  }

  async removeById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#cityService.removeById(id);
      return res.status(httpCodes.OK).json({ message: cityMessages.Remove });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new cityController();
