const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const PublicMessage = require("../../common/messages/public.message");
const { isValidObjectId } = require("mongoose");
const { cityCreateValidation } = require("./city.validation");
const CityModel = require("./city.model");
const cityMessages = require("./city.messages");
const provinceService = require("../province/province.service");

class cityeService {
  #cityModel;
  #provinceService;
  constructor() {
    autoBind(this);
    this.#cityModel = CityModel;
    this.#provinceService = provinceService;
  }

  async create({ name, provinceId }) {
    await cityCreateValidation({ name, provinceId });
    await this.existNotCityByName(name);
    await this.#provinceService.findProvinceByid(provinceId)
    await this.#cityModel.create({ name, provinceId });
  }

  async findByid(id) {
    const city = await this.findCityByid(id);
    if (!city) {
      throw new createHttpError.NotFound(cityMessages.NotFound);
    }
    return city;
  }

  async findAll() {
    const city = await this.#cityModel.find().lean();
    return city;
  }

  async removeById(id) {
    await this.findCityByid(id);
    const city = await this.#cityModel.deleteOne({ _id: id });
    if (!city.deletedCount) {
      throw new createHttpError.InternalServerError(
        PublicMessage.InternalServerError
      );
    }
  }

  async findCityByid(id) {
    const city = await this.#cityModel.findOne({ _id: id }).lean();
    if (!city) {
      throw new createHttpError.NotFound(cityMessages.NotFound);
    }
    return city;
  }

  async existNotCityByName(name) {
    const city = await this.#cityModel.findOne({ name }).lean();
    if (city) {
      throw new createHttpError.BadRequest(cityMessages.Duplicate);
    }
  }


}

module.exports = new cityeService();
