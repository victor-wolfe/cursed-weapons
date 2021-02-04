const express = require("express")
const {
  addItem,
  deleteItem,
  getAllItems,
  getItem,
  getItemStats,
  updateItem,
} = require("../controllers/itemController")

const router = express.Router()

router.route("/stats").get(getItemStats)

router.route("/").get(getAllItems).post(addItem)
router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem)

module.exports = router
