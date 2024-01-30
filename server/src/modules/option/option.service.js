const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const { optionValidation } = require("./option.validation");
const optionMessages = require("./option.messages");
const httpCodes = require("http-codes");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const {
  isValidCategoryId,
  isValidOptionsId,
} = require("../../common/utils/isValid");

class optionService {
  #optionModel;
  constructor() {
    autoBind(this);
    this.#optionModel = OptionModel;
  }

  async create(categoryDto) {
    await optionValidation(categoryDto);
    await this.checkExistOptionByKey(categoryDto.key);
    await this.#optionModel.create(categoryDto);
  }

  async findAll() {
    const options = await this.#optionModel.find();
    return options;
  }

  async findByCategoryId(categoryid) {
    await this.isValidCategoryId(categoryid);

    const options = await this.#optionModel
      .find({ category: categoryid })
      .lean();
    return options;
  }

  async removeByCategoryId(categoryid) {
    await isValidCategoryId(categoryid);

    await this.#optionModel.deleteMany({ category: categoryid }).lean();
  }

  async update(optionId, optionUpdateDto) {
    await isValidOptionsId(optionId);

    const { modifiedCount } = await this.#optionModel.updateOne(
      { _id: optionId },
      { ...optionUpdateDto }
    );

    if (!modifiedCount) {
      throw new createHttpError.BadRequest(optionMessages.NotFound);
    }
  }

  async remove(id) {
    await isValidOptionsId(id);

    await this.#optionModel.deleteMany({ category: id }).lean();
  }

  async checkExistOptionByKey(key) {
    const option = await this.#optionModel.findOne({ key }).lean();
    if (option)
      throw new createHttpError.NotFound(optionMessages.DuplicateOption);
    return false;
  }
}

module.exports = new optionService();
