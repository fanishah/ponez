const { randomInt } = require("crypto");

function otpCreator() {
  const nowTime = new Date().getTime();
  const otp = {
    code: randomInt(10000, 99999).toString(), // ایجاد کد رندوم 5 رقمی
    expiresIn: nowTime + 1000 * 60 * 2, // افرودن 2 دقیقه به زمان حال برای تاریخ انقای کد
  };
  return otp;
}

module.exports = otpCreator;
