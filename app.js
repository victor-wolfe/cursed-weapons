const path = require("path")
const express = require("express")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")

const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorHandler")

const itemRouter = require("./routers/itemRouter")
const userRouter = require("./routers/userRouter")
const reviewRouter = require("./routers/reviewRouter")

const app = express()

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

// Global Middleware
// Serves static files
app.use(express.static(path.join(__dirname, "public")))

// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

// Limit requests to API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again in an hour.",
})

app.use("/api", limiter)

// Body parser
app.use(
  express.json({
    limit: "10kb",
  })
)

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["type", "curseLevel"],
  })
)

// Routes
app.get("/", (req, res) => {
  res.status(200).render("test")
})

app.use("/api/v1/inventory", itemRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/reviews", reviewRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)

module.exports = app
