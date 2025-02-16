const yup = require("yup");
const createHttpError = require("http-errors");
const postMessages = require("./post.messages");

const postSchema = yup.object().shape({
  title: yup.string().required("یک عنوان برای آگهی وارد کنید"),
  description: yup.string().required("باید توضیحات برای آگهی وارد کنید"),
  img: yup.array(),
  province: yup.string().required("انتخاب استان اجباری می باشد"),
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
  province : yup.string(),
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
  const isValid = await postSchema.validateSync(postDto);
  console.log(isValid)
  if (!isValid)
    throw new createHttpError.BadRequest(postMessages.NotIsValidPostDto);
}

async function postUpdateValidation(postUpdateDto) {
  const isValid = await postUpdateSchema.isValid(postUpdateDto);
  if (!isValid)
    throw new createHttpError.BadRequest(postMessages.NotIsValidPostDto);
}

module.exports = { postCreateValidation, postUpdateValidation };
