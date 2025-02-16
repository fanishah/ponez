const autoBind = require("auto-bind");
const ProvinceModel = require("./province.model");
const createHttpError = require("http-errors");
const provinceMessages = require("./province.messages");
const { provinceCreateValidation } = require("./province.validation");
const PublicMessage = require("../../common/messages/public.message");
const { isValidObjectId, Types } = require("mongoose");
const CityModel = require("../city/city.model");

class provinceService {
  #provinceModel;
  #cityModel;
  constructor() {
    autoBind(this);
    this.#provinceModel = ProvinceModel;
    this.#cityModel = CityModel;
  }

  async create(name) {
    await provinceCreateValidation({ name });
    await this.existNotProvinceByName(name);
    await this.#provinceModel.create({ name });
  }

  async findByid(id) {
    return await this.findProvinceByid(id);
  }

  async findAll() {
    const provinces = await this.#provinceModel.aggregate([
      {
        $lookup: {
          from: "cities",
          localField: "_id",
          foreignField: "provinceId",
          as: "cities",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    return provinces;
  }

  async removeById(id) {
    await this.findProvinceByid(id);
    const province = await this.#provinceModel.deleteOne({ _id: id });
    const cities = await this.#cityModel.deleteMany({ provinceId: id });
    if (!province.deletedCount || !cities.deletedCount) {
      throw new createHttpError.InternalServerError(
        PublicMessage.InternalServerError
      );
    }
  }

  async findProvinceByid(id) {
    if (!isValidObjectId(id)) {
      throw new createHttpError.NotFound(provinceMessages.NotIsValidID);
    }
    const province = await this.#provinceModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "_id",
          foreignField: "provinceId",
          as: "cities",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    if (!province) {
      throw new createHttpError.NotFound(provinceMessages.NotFound);
    }
    return province;
  }

  async existNotProvinceByName(name) {
    const province = await this.#provinceModel.findOne({ name }).lean();
    if (province) {
      throw new createHttpError.BadRequest(provinceMessages.Duplicate);
    }
  }
}

module.exports = new provinceService();
