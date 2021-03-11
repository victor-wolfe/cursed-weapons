const express = require("express")
const {
  addItem,
  deleteItem,
  getAllItems,
  getItem,
  getItemStats,
  updateItem,
} = require("../controllers/itemController")
const authController = require("./../controllers/authController")
const reviewRouter = require("./reviewRouter")

const router = express.Router()

router.route("/stats").get(getItemStats)

router.route("/").get(getAllItems).post(addItem)
router
  .route("/:id")
  .get(getItem)
  .patch(authController.restrictTo("admin"), updateItem)
  .delete(authController.restrictTo("admin"), deleteItem)

router.use("/:itemId/reviews", reviewRouter)

module.exports = router
