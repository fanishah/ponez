const createHttpError = require("http-errors");
const yup = require("yup");
const optionMessages = require("./option.messages");

const optionSchema = yup.object().shape({
  title: yup.string().required(),
  key: yup.string().required(),
  guid: yup.string(),
  list: yup.array(),
  required: yup.bool(),
  category: yup.string().required(),
});

// اعتبار سنجی دسته بندی
async function optionValidation(categoryDto) {
  const isValidOptionS = await optionSchema.isValid(categoryDto);
  if (!isValidOptionS)
    throw new createHttpError.BadRequest(optionMessages.NotValidOption);
}

module.exports = { optionValidation };
