const express = require("express")
const {
  getReviews,
  postReview,
  updateReview,
  deleteReview,
} = require("./../controllers/reviewController")

const authController = require("./../controllers/authController")

const router = express.Router({ mergeParams: true })

router.route("/").get(getReviews).post(authController.protect, postReview)
router.route("/:id").patch(updateReview).delete(deleteReview)

module.exports = router
