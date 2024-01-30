const autoBind = require("auto-bind");
const profileMessages = require("./profile.messages");
const createHttpError = require("http-errors");
const userService = require("../user/user.service");

class profileService {
  #userService;
  constructor() {
    autoBind(this);
    this.#userService = userService;
  }
  async profileMe(mobile) {
    const findUser = await this.#userService.findByMobile(mobile);
    delete findUser.otp
    return findUser;
  }
}

module.exports = new profileService();
