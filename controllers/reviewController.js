const Review = require("./../models/reviewModel")
const factory = require("./factoryFunctions")

exports.setItemUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.item) req.body.item = req.params.itemId
  req.body.user = req.user.id
  next()
}

exports.getAllReviews = factory.getAll(Review)
exports.getReview = factory.getOne(Review)
exports.postReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review)
