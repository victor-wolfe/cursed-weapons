const mongoose = require("mongoose")
const slugify = require("slugify")

const itemSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Name required"],
      unique: true,
      trim: true,
    },
    slug: String,
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    curseLevel: {
      type: String,
      required: [true, "Curse level required"],
    },
    description: {
      type: String,
      required: [true, "Description required"],
      trim: true,
    },
    reviews: {
      type: [String],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    type: {
      type: String,
      default: "sword",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

itemSchema.pre("save", function (next) {
  this.slug = slugify(this.productName, { lower: true })
  next()
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item
