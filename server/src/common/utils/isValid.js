const createHttpError = require("http-errors");
const { mobileValidation } = require("../../modules/auth/auth.validation");
const userMessages = require("../../modules/user/user.messages");
const { isValidObjectId } = require("mongoose");
const categoryMessages = require("../../modules/category/category.messages");
const optionMessages = require("../../modules/option/option.messages");
const postMessages = require("../../modules/post/post.messages");

exports.isValidCategoryId = async (categoryid) => {
  if (!isValidObjectId(categoryid)) {
    throw new createHttpError.NotFound(categoryMessages.NotFound);
  }
};

exports.isValidOptionsId = async (categoryid) => {
  if (!isValidObjectId(categoryid)) {
    throw new createHttpError.NotFound(optionMessages.NotValidOptionId);
  }
};

exports.isValidPostId = async (postid) => {
  if (!isValidObjectId(postid)) {
    throw new createHttpError.BadRequest(postMessages.NotIsValidPostId);
  }
};
