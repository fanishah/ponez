const swaggerjsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const swaggerDocument = swaggerjsDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Ponez API",
        description: "Ponez API document",
        version: "0.0.1",
      },
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });
  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/swagger", swaggerUi.serve, swagger);
}

module.exports = SwaggerConfig;
