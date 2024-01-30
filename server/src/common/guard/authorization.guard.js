const { AccessToken } = require("../constant/cookie.enum");
const AuthorizationMessage = require("../messages/auth.message");
const httpCodes = require("http-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../../modules/user/user.model");
const UserRole = require("../constant/userRole.enum");
const createHttpError = require("http-errors");
dotenv.config();

// بررسی دسترسی ها کاربر
exports.Authorization = (permissionRole) => {
  return async (req, res, next) => {
    try {
      const accessToken = req?.cookies[AccessToken];
      if (!accessToken) {
        throw new createHttpError.Unauthorized(
          AuthorizationMessage.Unauthorized
        );
      }

      const verifyaccessToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY
      );

      if (verifyaccessToken?.userId) {
        const findUser = await UserModel.findById(verifyaccessToken.userId, {
          otp: 0,
          __v: 0,
        }).lean();

        if (!findUser) {
          throw new createHttpError.Unauthorized(
            AuthorizationMessage.NotFoundAccount
          );
        }

        req.user = findUser;

        // دریافت رول مورد نیاز
        const requiredPermissionRole = UserRole.find((role) => {
          return role.name === permissionRole.toUpperCase();
        });

        // دریافت رول کاربر
        const userPermissionRole = UserRole.find((role) => {
          return role.name === req.user.role.toUpperCase();
        });

        // مقایسه رول ها
        if (userPermissionRole.key >= requiredPermissionRole.key) return next();

        throw new createHttpError.Forbidden(AuthorizationMessage.Forbidden);
      }
      throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
    } catch (err) {
      next(err);
    }
  };
};
