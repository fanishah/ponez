// ارور هندلر
function AllExceptionHandler(app) {
  app.use((err, req, res, next) => {
    // console.log(err);
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
    res.status(status).json({
      error: err?.message ?? err?.stack ?? "InternalServerError",
    });
  });
}
module.exports = AllExceptionHandler;
