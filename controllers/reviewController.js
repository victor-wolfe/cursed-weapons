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

exports.postReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body)

  res.status(200).json({
    status: "success",
    data: {
      review: newReview,
    },
  })
})

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!review) {
    return next(new AppError("Review not found.", 404))
  }
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  })
})

exports.deleteReview = factory.deleteOne(Review)
