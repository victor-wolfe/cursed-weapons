const mongoose = require("mongoose")
const User = require("./userModel")
const Item = require("./itemModel")

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating required"],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      maxlength: [1000, "Calm down there, Tolstoy. 1000 characters max."],
    },
    item: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Item,
        required: [true, "Review must belong to an item"],
      },
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: [true, "You must be logged in to review."],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "item",
    select: "name",
  }).populate({
    path: "user",
    select: "name photo",
  })
  next()
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review
