const autoBind = require("auto-bind");
const profileMessages = require("./post.messages");
const {
  postCreateValidation,
  postUpdateValidation,
} = require("./post.validation");
const PostModel = require("./post.model");
const createHttpError = require("http-errors");
const path = require("path");
const fs = require("fs");
const {
  isValidCategoryId,
  isValidPostId,
} = require("../../common/utils/isValid");
const postMessages = require("./post.messages");
const { Types } = require("mongoose");
const { dirPublic } = require("../../common/exception/createFolder");
const UserRole = require("../../common/constant/userRole.enum");

class postService {
  #postModel;
  constructor() {
    autoBind(this);
    this.#postModel = PostModel;
  }

  async create(postDto, photos) {
    // اعتبارسنجی اطلاعات پست
    await postCreateValidation(postDto);

    await isValidCategoryId(postDto.categoryid);

    const img = photos.map((photo) => {
      return `${new Date().getFullYear()}/${
        new Date().getMonth() + 1 <= 9 //
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() + 1
      }/${photo.filename}`;
    });

    postDto.img = img;
    delete postDto.status;
    await this.#postModel.create(postDto);
  }

  async findAll() {
    const findAllPost = await this.#postModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "categoryinfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $unwind: "$categoryinfo",
      },
      {
        $unwind: "$userinfo",
      },
      {
        $project: {
          userid: 0,
          categoryid: 0,
          __v: 0,
          "categoryinfo.parents": 0,
          "categoryinfo.parent": 0,
          "categoryinfo.options": 0,
          "categoryinfo.__v": 0,
          "userinfo.otp": 0,
          "userinfo.role": 0,
          "userinfo.verifiedMobile": 0,
          "userinfo.createdAt": 0,
          "userinfo.updatedAt": 0,
          "userinfo.__v": 0,
        },
      },
    ]);
    return findAllPost;
  }

  async findAllByCityAndState(searchDto) {
    const findPost = await this.#postModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "categoryinfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $project: {
          userid: 0,
          categoryid: 0,
          __v: 0,
          "categoryinfo.parents": 0,
          "categoryinfo.parent": 0,
          "categoryinfo.options": 0,
          "categoryinfo.__v": 0,
          "userinfo.otp": 0,
          "userinfo.role": 0,
          "userinfo.verifiedMobile": 0,
          "userinfo.createdAt": 0,
          "userinfo.updatedAt": 0,
          "userinfo.__v": 0,
        },
      },
      {
        $unwind: "$categoryinfo",
      },
      {
        $unwind: "$userinfo",
      },
    ]);
    return findPost;
  }

  async findById(id) {
    await isValidPostId(id);
    const findPost = await this.#postModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "categoryinfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $project: {
          userid: 0,
          categoryid: 0,
          __v: 0,
          "categoryinfo.parents": 0,
          "categoryinfo.parent": 0,
          "categoryinfo.options": 0,
          "categoryinfo.__v": 0,
          "userinfo.otp": 0,
          "userinfo.role": 0,
          "userinfo.verifiedMobile": 0,
          "userinfo.createdAt": 0,
          "userinfo.updatedAt": 0,
          "userinfo.__v": 0,
        },
      },
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $unwind: "$categoryinfo",
      },
      {
        $unwind: "$userinfo",
      },
    ]);
    if (findPost.length === 0) {
      throw new createHttpError.NotFound(postMessages.NotFound);
    }
    return findPost[0];
  }

  async update(postId, postUpdateDto, userinfo) {
    const findPost = await this.findById(postId);

    /*
     بررسی یکسان بودن یورز آیدی پست با یوزر آیدی کاربر
     در صورتی که کاربر رولش ممبر باشد
     */
    if (
      userinfo._id !== new Types.ObjectId(findPost.userinfo._id) &&
      userinfo.role == UserRole[UserRole.length - 1].name
    ) {
      throw new createHttpError.Forbidden(postMessages.ForbiddenForUpdate);
    }

    delete postUpdateDto.userid;
    delete postUpdateDto.img;

    const { modifiedCount } = await this.#postModel.updateOne(
      { _id: postId },
      { ...postUpdateDto }
    );

    if (!modifiedCount) {
      throw new createHttpError.BadRequest(postMessages.NotFound);
    }
  }

  async remove(id, userinfo) {
    await isValidPostId(id);

    const findPost = await this.findById(id);

    /*
    بررسی یکسان بودن یورز آیدی پست با یوزر آیدی کاربر
    در صورتی که کاربر رولش ممبر باشد
    */
    if (
      userinfo._id !== new Types.ObjectId(findPost.userinfo._id) &&
      userinfo.role == UserRole[UserRole.length - 1].name // رول ممبر
    ) {
      throw new createHttpError.Forbidden(postMessages.ForbiddenForDeleted);
    }

    await this.#postModel.deleteOne({ _id: id }).lean();

    // پاک کردن عکس های آگهی
    if (findPost.img.length > 0) {
      for (let i = 0; i < findPost.img.length; i++) {
        fs.unlink(
          path.resolve(dirPublic, findPost.img[i]),
          async function (err) {
            if (err) return console.log(err);
          }
        );
      }
    }
  }
}

module.exports = new postService();
