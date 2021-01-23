const express = require("express")
const { getInventory, getItem } = require("../controllers/inventoryController")

const router = express.Router()

router.route("/").get(getInventory)
router.route("/:id").get(getItem)

module.exports = router
