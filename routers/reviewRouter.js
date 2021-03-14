const express = require("express")
const {
  getReview,
  getAllReviews,
  postReview,
  updateReview,
  deleteReview,
  setItemUserIds,
} = require("./../controllers/reviewController")

const authController = require("./../controllers/authController")

const router = express.Router({ mergeParams: true })
router.use(authController.protect)

router.route("/").get(getAllReviews).post(setItemUserIds, postReview)

router.use(authController.restrictTo("admin"))

router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview)

module.exports = router
