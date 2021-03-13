const AppError = require("../utils/appError")
const Review = require("./../models/reviewModel")

const catchAsync = require("../utils/catchAsync")
const factory = require("./factoryFunctions")

exports.getReviews = catchAsync(async (req, res, next) => {
  let filter = {}
  if (req.params.itemId) filter = { item: req.params.itemId }
  const reviews = await Review.find(filter)

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  })
})

exports.setItemUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.item) req.body.item = req.params.itemId
  req.body.user = req.user.id
  next()
}

exports.postReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review)
