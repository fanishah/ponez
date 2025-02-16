const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

function createRoute(req) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "uploads",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file?.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});

async function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const minetypes = [".jpg", ".jpeg", ".png"];
  if (minetypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(
    createHttpError.BadRequest("فرمت تصویر ارسال شده معتبر نمی باشد."),
    false
  );
}

const pictureMaxSize = 1 * 1024 * 1024;

const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: pictureMaxSize },
});

module.exports = {
  uploadFile,
};
