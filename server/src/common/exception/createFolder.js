const fs = require("fs");
const path = require("node:path");

// آدرس پوشه سال ها در پوشه پاپلیک
const dirYearPublic = path.join(
  process.cwd(),
  `/public/${new Date().getFullYear()}`
);

// آدرس پوشه پاپلیک
exports.dirPublic = path.join(process.cwd(), "/public");

// آدرس پوشه های ماه درون پوشه سال ها در پوشه پاپلیک
exports.dirMonthPublic = path.join(
  process.cwd(),
  `/public/${new Date().getFullYear()}/${
    new Date().getMonth() + 1 <= 9 // اگه عدد زیر 9 بود
      ? `0${new Date().getMonth() + 1}` // کنار عدد 0 اضافه بشه
      : new Date().getMonth() + 1
  }`
);
// ساخت پوشه بر اساس سال و ماه
exports.createFolder = () => {
  if (!fs.existsSync(this.dirPublic)) {
    fs.mkdirSync(this.dirPublic);
  }
  if (!fs.existsSync(dirYearPublic)) {
    fs.mkdirSync(dirYearPublic);
  }
  if (!fs.existsSync(this.dirMonthPublic)) {
    fs.mkdirSync(this.dirMonthPublic);
  }
};
