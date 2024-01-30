const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const httpCodes = require("http-codes");
const authMessages = require("./auth.messages");
const { checkOtpValidation, mobileValidation } = require("./auth.validation");
const CookieNames = require("../../common/constant/cookie.enum");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AuthorizationMessage = require("../../common/messages/auth.message");
const userService = require("../user/user.service");
const createHttpError = require("http-errors");
const otpCreator = require("../../common/utils/otpCreator");

dotenv.config();

class authService {
  #userModel;
  #userService;
  constructor() {
    autoBind(this);
    this.#userModel = UserModel;
    this.#userService = userService;
  }

  // ارسال کد تایید برای کاربر
  async sendOTP(mobile) {
    // اعتبار سنجی شماره موبایل
    await mobileValidation(mobile);

    const findUser = await this.#userService.findByMobile(mobile, false);

    if (!findUser) {
      // ایجاد کاربر
      await this.#userService.create(mobile);
    } else {
      // otp چک کردن انقضا کد
      if (findUser.otp && findUser.otp.expiresIn > new Date().getTime()) {
        throw new createHttpError.BadRequest(authMessages.OtpCodeNotExpired);
      }

      // برای کاربر otp درج
      await this.#userService.updateByMobile(mobile, { otp: otpCreator() });
    }
  }

  // چک کردن کد تایید کاربر
  async checkOTP(res, { mobile, code }) {
    // اعتبارسنجی شماره موبایل و کد تایید
    await checkOtpValidation({ mobile, code });

    const user = await this.#userService.findByMobile(mobile);

    if (user.otp.expiresIn < new Date().getTime())
      throw new createHttpError.BadRequest(authMessages.OtpCodeExpired);
    if (user.otp.code !== code)
      throw new createHttpError.BadRequest(authMessages.OtpCodeIncorrect);
    if (!user.verifiedMobile)
      await this.#userService.updateByMobile({ mobile, verifiedMobile: true });

    // AccessToken ساخت
    const AccessToken = await this.signAccessToken({
      userId: user._id,
      mobile: user.mobile,
    });
    // RefreshToken ساخت
    const RefreshToken = await this.signRefreshToken({
      userId: user._id,
      mobile: user.mobile,
    });

    res.cookie(CookieNames.AccessToken, AccessToken, {
      secure: true,
      httpOnly: true,
      expiresIn: "1h",
    });
    res.cookie(CookieNames.RefreshToken, RefreshToken, {
      secure: true,
      httpOnly: true,
      expiresIn: "30d",
    });

    // منقضی کردن کد تایید
    await this.#userService.updateByMobile(mobile, {
      otp: { code: "00000", expiresIn: "0" },
    });
  }

  // ساخت مجدد توکن
  async refrshToken(res, userRefreshToken) {
    if (!userRefreshToken)
      throw new createHttpError.Unauthorized(AuthorizationMessage.Unauthorized);

    let UserMobile = null;
    jwt.verify(
      userRefreshToken,
      process.env.JWT_SECRET_KEY,
      function (err, decoded) {
        if (err)
          throw new createHttpError.Unauthorized(
            AuthorizationMessage.Unauthorized
          );
        UserMobile = decoded?.mobile;
      }
    );

    const user = await this.#userService.findByMobile(UserMobile);

    if (!user) {
      throw new createHttpError.NotFound(authMessages.NotFoundAccount);
    }

    // AccessToken ساخت
    const AccessToken = await this.signAccessToken({
      userId: user._id,
      mobile: user.mobile,
    });
    // RefreshToken ساخت
    const RefreshToken = await this.signRefreshToken({
      userId: user._id,
      mobile: user.mobile,
    });

    res.cookie(CookieNames.AccessToken, AccessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1h
    });
    res.cookie(CookieNames.RefreshToken, RefreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //30d
    });
  }

  // خروج کاربر
  async logout(res) {
    res.clearCookie(CookieNames.AccessToken);
    res.clearCookie(CookieNames.RefreshToken);

    return res.status(httpCodes.OK).json({
      message: authMessages.LogoutSuccessfully,
    });
  }

  // AccessToken ایجاد
  async signAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
  }

  // RefreshToken ایجاد
  async signRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
  }
}

module.exports = new authService();
