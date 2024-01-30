const multer = require("multer");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
const { createFolder, dirMonthPublic } = require("./createFolder");

// کانفیک مالتر
const diskStorageMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    createFolder();
    cb(null, path.resolve(dirMonthPublic));
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.${file.mimetype.split("/")[1]}`);
  },
});

module.exports = diskStorageMulter;
