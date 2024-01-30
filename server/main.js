const express = require("express");
const mainRouter = require("./src/app.routes");
const SwaggerConfig = require("./src/config/swagger.config");
const app = express();
const dotenv = require("dotenv");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
dotenv.config();

function main() {
  // کانفیگ اتصال به دیتابیس
  require("./src/config/mongoose.config");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/public", express.static(path.join(__dirname, "public")));
  app.use(morgan("tiny"));

  app.use(mainRouter);
  SwaggerConfig(app);
  AllExceptionHandler(app);
  NotFoundHandler(app);
  app.listen(process.env.PORT, () => {
    console.log(`Server runing port ${process.env.PORT}`);
  });
}

main();
