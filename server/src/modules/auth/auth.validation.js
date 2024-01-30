const yup = require("yup");
const authMessages = require("./auth.messages");
const httpCodes = require("http-codes");
const createHttpError = require("http-errors");

const mobileSchema = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/)
    .required(),
});

const codeOtpSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/\b\d{5}\b/g)
    .required(),
});

// اعتبار سنجی موبایل
async function mobileValidation(mobile) {
  const isValidMobile = await mobileSchema.isValid({ mobile });
  if (!isValidMobile)
    throw new createHttpError.BadRequest(authMessages.NotIsValidMobile);
}

// اعتبار سنجی شماره موبایل و کد تایید
async function checkOtpValidation({ mobile, code }) {
  await mobileValidation(mobile);

  const isValidOtp = await codeOtpSchema.isValid({ code });

  if (!isValidOtp)
    throw new createHttpError.BadRequest(authMessages.NotIsValidCodeOTP);
}

module.exports = { mobileValidation, checkOtpValidation };
