const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const OptionModel = require("../option/option.model");
const { categoryValidation } = require("./category.validation");
const categoryMessages = require("./category.messages");
const httpCodes = require("http-codes");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { isValidCategoryId } = require("../../common/utils/isValid");
const { Types } = require("mongoose");

class categoryService {
  #categoryModel;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#categoryModel = CategoryModel;
    this.#optionModel = OptionModel;
  }

  async create(categoryDto) {
    // اعتبار سنجی ورودی های کاربر
    await categoryValidation(categoryDto);

    await this.checkNotExistCategoryBySlug(categoryDto.slug);

    // داشتن والد در دسته بندی
    if (categoryDto?.parent && isValidObjectId(categoryDto?.parent)) {
      const checkExistParentCategory = await this.checkExistCategoryById(
        categoryDto?.parent
      );

      // ساخت والد های کل دسته بندی
      categoryDto.parents = [
        ...new Set(
          [categoryDto.parent.toString()].concat(
            checkExistParentCategory.parents
          )
        ),
      ];
    }

    await this.#categoryModel.create(categoryDto);
  }

  async findAll() {
    const category = await this.#categoryModel.aggregate([
      {
        $lookup: {
          from: "options",
          localField: "_id",
          foreignField: "category",
          as: "options",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "children",
        },
      },
      {
        $match: {
          parent: { $exists: false },
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    return category;
  }

  async findBySlug(slug) {
    const category = await this.#categoryModel.aggregate([
      {
        $lookup: {
          from: "options",
          localField: "_id",
          foreignField: "category",
          as: "options",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "children",
        },
      },
      {
        $match: {
          slug,
        },
      },
    ]);
    if (category.length === 0) {
      throw new createHttpError.NotFound(categoryMessages.NotFound);
    }
    return category;
  }

  async update(categoryId, categoryUpdateDto) {
    await isValidCategoryId(categoryId);

    if (
      categoryUpdateDto?.parent &&
      isValidObjectId(categoryUpdateDto?.parent)
    ) {
      const checkExistParentCategory = await this.checkExistCategoryById(
        categoryUpdateDto?.parent
      );
      // ساخت والد های کل دسته بندی
      categoryUpdateDto.parents = [
        ...new Set(
          [categoryUpdateDto.parent.toString()].concat(
            checkExistParentCategory.parents
          )
        ),
      ];
    }

    const { modifiedCount } = await this.#categoryModel.updateOne(
      { _id: categoryId },
      { ...categoryUpdateDto }
    );

    if (!modifiedCount) {
      throw new createHttpError.BadRequest(categoryMessages.NotFound);
    }
  }

  async remove(id) {
    this.#optionModel.deleteMany({ category: id }).then(async () => {
      await this.#categoryModel.deleteOne({ _id: id }).lean();
      await this.#categoryModel.deleteMany({ parent: id }).lean();
    });
  }

  async checkExistCategoryById(id) {
    await isValidCategoryId(id);
    const category = await this.#categoryModel.findOne({ _id: id }).lean();
    if (!category) {
      throw new createHttpError.NotFound(categoryMessages.NotFound);
    }
    return category;
  }

  async checkNotExistCategoryBySlug(slug) {
    const category = await this.#categoryModel.findOne({ slug }).lean();
    if (category) {
      throw new createHttpError.NotFound(categoryMessages.DuplicateCategory);
    }
    return false;
  }
}

module.exports = new categoryService();
