const express = require("express")
const {
  getReviews,
  postReview,
  updateReview,
  deleteReview,
  setItemUserIds,
} = require("./../controllers/reviewController")

const authController = require("./../controllers/authController")

const router = express.Router({ mergeParams: true })

router
  .route("/")
  .get(getReviews)
  .post(authController.protect, setItemUserIds, postReview)
router.route("/:id").patch(updateReview).delete(deleteReview)

module.exports = router
