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

router
  .route("/")
  .get(getAllReviews)
  .post(authController.protect, setItemUserIds, postReview)
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview)

module.exports = router
