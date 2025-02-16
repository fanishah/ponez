const autoBind = require("auto-bind");
const UserModel = require("./user.model");
const userMessages = require("./user.messages");
const otpCreator = require("../../common/utils/otpCreator");
const createHttpError = require("http-errors");
const permissionUserRole = require("../../common/utils/permissionUserRole");
const { userUpdateValidation } = require("./user.validation");
const { mobileValidation } = require("../auth/auth.validation");

class userService {
  #userModel;
  constructor() {
    autoBind(this);
    this.#userModel = UserModel;
  }
  async create(mobile) {
    await mobileValidation(mobile);

    await this.exsitUser(mobile);

    const otp = otpCreator();

    await this.#userModel.create({ mobile, otp });
  }

  async findAll() {
    const users = await this.#userModel.find().lean();
    return users;
  }

  async findByMobile(mobile, notSendOtp = true) {
    await mobileValidation(mobile);

    const user = await this.#userModel.findOne({ mobile }, { __v: 0 }).lean();

    if (!user && notSendOtp)
      throw new createHttpError.NotFound(userMessages.NotFoundUser);
    return user;
  }

  async removeByMobile(mobile) {
    await mobileValidation(mobile);
    await this.findByMobile(mobile);

    await this.#userModel.deleteOne({ mobile }).lean();
  }

  async updateByMobile(mobile, userDto, infoUserRole = "MEMBER") {
    await userUpdateValidation(userDto);

    const UserRole = permissionUserRole(infoUserRole);

    if (UserRole.key === 1) {
      delete userDto.role;
    } else if (UserRole.key === 0) {
      delete userDto?.role;
      delete userDto?.mobile;
    }
    const { modifiedCount } = await this.#userModel.updateOne(
      { mobile },
      { ...userDto }
    );

    if (!modifiedCount) {
      throw new createHttpError.BadRequest(userMessages.NotFoundUser);
    }
  }

  async exsitUser(mobile) {
    const user = await this.#userModel.findOne({ mobile }).lean();
    if (user) {
      throw new createHttpError.BadRequest(userMessages.DuplicateMobileUser);
    }
    return false;
  }
}

module.exports = new userService();
