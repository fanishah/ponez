const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { RefreshToken } = require("../../common/constant/cookie.enum");
const httpCodes = require("http-codes");
const authMessages = require("./auth.messages");

class authController {
  #authService;
  constructor() {
    autoBind(this);
    this.#authService = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#authService.sendOTP(mobile);
      return res.status(httpCodes.ACCEPTED).json({
        message: authMessages.SendOtpSuccessfully,
      });
    } catch (err) {
      next(err);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      await this.#authService.checkOTP(res, { mobile, code });
      return res.status(httpCodes.ACCEPTED).json({
        message: authMessages.LoginSuccessfully,
      });
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const userRefreshToken = req?.cookies[RefreshToken];
      await this.#authService.refrshToken(res, userRefreshToken);
      return res.status(httpCodes.ACCEPTED).json({
        message: authMessages.RefreshTokenSuccessfully,
      });
    } catch (err) {
      next(err);
    }
  }
  
  async logout(req, res, next) {
    try {
      this.#authService.logout(res);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new authController();
