const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")

dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB")
  })

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on ${port}`)
})

// process.on("unhandledRejection", (err) => {
//   console.log("Unhandled rejection. Shutting down server.")
//   console.log(err.name, err.message)
//   server.close(() => process.exit(1))
// })

// process.on("uncaughtException", (err) => {
//   console.log("Uncaught exception. Shutting down server.")
//   console.log(err.name, err.message)
//   server.close(() => process.exit(1))
// })
