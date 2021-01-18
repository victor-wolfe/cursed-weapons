const express = require("express")
const morgan = require("morgan")

const { getInventory, getItem } = require("./controllers/inventoryController")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.static("./images"))

app.use("/api/v1/inventory", getInventory)
app.use("/api/v1/inventory:id", getItem)

module.exports = app
