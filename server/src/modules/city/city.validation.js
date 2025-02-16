const yup = require("yup");
const createHttpError = require("http-errors");
const cityMessages = require("./city.messages");
const cityeService = require("./city.service");
const { isValidObjectId } = require("mongoose");

const cityCreateSchema = yup.object().shape({
  name: yup.string().required(),
  provinceId: yup.string().required(),
});

// اعتبار سنجی دسته بندی
async function cityCreateValidation(cityDto) {
  const isValid = await cityCreateSchema.isValid(cityDto);
  if (!isValidObjectId(cityDto.provinceId)) {
    throw new createHttpError.NotFound(cityMessages.NotIsValidUseDto);
  }
  if (!isValid)
    throw new createHttpError.BadRequest(cityMessages.NotIsValidUseDto);
}

module.exports = { cityCreateValidation };
