const autoBind = require("auto-bind");
const profileService = require("./profile.service");
const httpCodes = require("http-codes");
const profileMessages = require("./profile.messages");

class profileController {
  #profileService;
  constructor() {
    autoBind(this);
    this.#profileService = profileService;
  }

  async profileMe(req, res, next) {
    try {
      const profile = await this.#profileService.profileMe(req.user?.mobile);
      return res.status(httpCodes.OK).json({ profile });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new profileController();
