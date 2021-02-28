const express = require("express")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")

const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorHandler")

const itemRouter = require("./routers/itemRouter")
const userRouter = require("./routers/userRouter")

const app = express()

// Global Middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

//allows 100 requests per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again in an hour.",
})

app.use("/api", limiter)
app.use(express.json())
app.use(express.static("./images"))

app.use("/api/v1/inventory", itemRouter)
app.use("/api/v1/users", userRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)

module.exports = app
