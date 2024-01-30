const yup = require("yup");
const categoryMessages = require("./category.messages");
const createHttpError = require("http-errors");

const categorySchema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  icon: yup.string().required(),
  parent: yup.string(),
});

async function categoryValidation(categoryDto) {
  const isValidCategory = await categorySchema.isValid(categoryDto);
  if (!isValidCategory)
    throw new createHttpError.BadRequest(categoryMessages.NotValidCategory);
}

module.exports = { categoryValidation };
