class AppError extends Error {
  constructor(message, statusCode) {
    // parent call sets the message property
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
    this.isOperational = true

    //ensures this is not captured in the stacktrace
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
