const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const Review = require("./../models/reviewModel")

exports.getReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const reviews = await features.query

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews: reviews,
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

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id)
  if (!review) {
    return next(new AppError("No review found with that ID", 404))
  }
  res.status(204).json({
    status: "success",
    data: null,
  })
})
