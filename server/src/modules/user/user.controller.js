const autoBind = require("auto-bind");
const userService = require("./user.service");
const httpCodes = require("http-codes");
const userMessages = require("./user.messages");

class userController {
  #userService;
  constructor() {
    autoBind(this);
    this.#userService = userService;
  }

  async create(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#userService.create(mobile);
      return res
        .status(httpCodes.CREATED)
        .json({ message: userMessages.Created });
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const users = await this.#userService.findAll();
      return res.status(httpCodes.OK).json({ users });
    } catch (err) {
      next(err);
    }
  }

  async findByMobile(req, res, next) {
    try {
      const { mobile } = req.params;
      console.log(mobile);
      const user = await this.#userService.findByMobile(mobile);
      return res.status(httpCodes.OK).json({ user });
    } catch (err) {
      next(err);
    }
  }

  async removeByMobile(req, res, next) {
    try {
      const { mobile } = req.params;
      await this.#userService.removeByMobile(mobile);
      return res.status(httpCodes.OK).json({ message: userMessages.Deleted });
    } catch (err) {
      next(err);
    }
  }

  async updateByMobile(req, res, next) {
    try {
      const { mobile } = req.params;
      await this.#userService.updateByMobile(mobile, req.body, req.user?.role);
      return res.status(httpCodes.OK).json({ message: userMessages.Updated });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new userController();
