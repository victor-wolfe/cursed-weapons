const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Item = require("../models/itemModel")

dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB successful")
  })

// read JSON
const items = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"))

// IMPORT TO DB
const importData = async () => {
  try {
    await Item.create(items)
    console.log("data loaded")
  } catch (err) {
    console.log(error)
  }
  process.exit()
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Item.deleteMany()
    console.log("data deleted")
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// shows the command line arguments
// console.log(process.argv)

if (process.argv[2] === "--import") {
  importData()
} else if (process.argv[2] === "--delete") {
  deleteData()
}
