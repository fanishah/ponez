const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const provinceService = require("./province.service");
const provinceMessages = require("./province.messages");

class provinceController {
  #provinceService;
  constructor() {
    autoBind(this);
    this.#provinceService = provinceService;
  }

  async create(req, res, next) {
    try {
      const { name } = req.body;
      await this.#provinceService.create(name);
      return res
        .status(httpCodes.CREATED)
        .json({ message: provinceMessages.Created });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const province = await this.#provinceService.findAll();
      return res.status(httpCodes.OK).json({ province });
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const province = await this.#provinceService.findByid(id);
      return res.status(httpCodes.OK).json({ province });
    } catch (err) {
      next(err);
    }
  }
  
  async removeById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#provinceService.removeById(id);
      return res
        .status(httpCodes.OK)
        .json({ message: provinceMessages.Remove });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new provinceController();
