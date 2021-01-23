const express = require("express")
const {
  checkID,
  getInventory,
  getItem,
} = require("../controllers/inventoryController")

const router = express.Router()

// router.param("id", checkID)

router.route("/").get(getInventory)
router.route(":id").get(getItem)

module.exports = router
