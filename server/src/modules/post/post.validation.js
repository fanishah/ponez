const yup = require("yup");
const createHttpError = require("http-errors");
const postMessages = require("./post.messages");

const postSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  img: yup.array(),
  state: yup.string().required(),
  city: yup.string().required(),
  location: yup.string().required(),
  options: yup.array(),
  categoryid: yup.string().required(),
  userid: yup.string().required(),
  status: yup.bool(),
  isshowusermobile: yup.bool(),
  price: yup.string().required(),
});

const postUpdateSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  img: yup.array(),
  state: yup.string(),
  city: yup.string(),
  location: yup.string(),
  options: yup.array(),
  categoryid: yup.string(),
  userid: yup.string(),
  status: yup.bool(),
  isshowusermobile: yup.bool(),
  price: yup.string(),
});

// اعتبار سنجی دسته بندی
async function postCreateValidation(postDto) {
  const isValid = await postSchema.isValid(postDto);
  if (!isValid)
    throw new createHttpError.BadRequest(postMessages.NotIsValidPostDto);
}

async function postUpdateValidation(postUpdateDto) {
  const isValid = await postUpdateSchema.isValid(postUpdateDto);
  if (!isValid)
    throw new createHttpError.BadRequest(postMessages.NotIsValidPostDto);
}

module.exports = { postCreateValidation, postUpdateValidation };
