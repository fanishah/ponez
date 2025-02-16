const yup = require("yup");
const createHttpError = require("http-errors");
const provinceMessages = require("./province.messages");

const provinceUpdateSchema = yup.object().shape({
  name: yup.string().required(),
});

// اعتبار سنجی دسته بندی
async function provinceCreateValidation(provinceDto) {
  const isValid = await provinceUpdateSchema.isValid(provinceDto);
  if (!isValid)
    throw new createHttpError.BadRequest(provinceMessages.NotIsValidUseDto);
}

module.exports = { provinceCreateValidation };
