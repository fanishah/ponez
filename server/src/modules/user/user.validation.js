const yup = require("yup");
const createHttpError = require("http-errors");
const userMessages = require("./user.messages");

const userUpdateSchema = yup.object().shape({
  mobile: yup.string().matches(
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/
  ),
  otp: yup.object(),
  role: yup.string(),
  verifiedMobile: yup.bool(),
});

// اعتبار سنجی دسته بندی
async function userUpdateValidation(userDto) {
  const isValid = await userUpdateSchema.isValid(userDto);
  if (!isValid)
    throw new createHttpError.BadRequest(userMessages.NotIsValidUseDto);
}

module.exports = { userUpdateValidation };
