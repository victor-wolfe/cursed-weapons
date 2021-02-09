const express = require("express")
const morgan = require("morgan")
const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorHandler")

const itemRouter = require("./routers/itemRouter")
const userRouter = require("./routers/userRouter")

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static("./images"))

app.use("/api/v1/inventory", itemRouter)
app.use("/api/v1/users", userRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)

module.exports = app
