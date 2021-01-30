const express = require("express")
const {
  addItem,
  checkID,
  deleteItem,
  getInventory,
  getItem,
  updateItem,
} = require("../controllers/inventoryController")

const router = express.Router()

router.param("id", checkID)

router.route("/").get(getInventory).post(addItem)
router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem)

module.exports = router
