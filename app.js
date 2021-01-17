const express = require("express")
const morgan = require("morgan")

const inventoryController = require("./controllers/inventoryController")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.static("./images"))

app.use("/api/v1/inventory", inventoryController)
