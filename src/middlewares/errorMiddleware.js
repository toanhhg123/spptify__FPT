const createError = require("http-errors");
const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
const handleErrorNotFound = (req, res, next) => {
  return next(createError.NotFound("enpoint not match"));
};
module.exports = {
  errorHandler,
  handleErrorNotFound,
};
