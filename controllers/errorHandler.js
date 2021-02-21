const AppError = require("./../utils/appError")

// Handlers for individual types of errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 404)
}

const handleDuplicateFieldsDB = (err) => {
  const val = Object.values(err.keyValue)[0]
  const message = `Duplicate field value: ${val}`
  return new AppError(message, 500)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid input data: ${errors.join(". ")}`
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 404)

const handleJWTExpiredError = () =>
  new AppError("Expired token. Please log in again.", 404)

// Separate handlers for dev and prod
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  // Only send operational errors to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
    //Programming or other unknown error; do not sent to client
  } else {
    // log to server
    console.log("ERROR: ", err)
    // send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    })
  }
}

// Route error to be returned
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err)
    if (error.name === "CastError") error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error)
    if (error.name === "ValidationError") error = handleValidationErrorDB(error)
    if (error.name === "JsonWebTokenError") error = handleJWTError()
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError()
    sendErrorProd(error, res)
  }
}
