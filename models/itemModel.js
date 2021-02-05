const mongoose = require("mongoose")
const slugify = require("slugify")

const itemSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Name required"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "Whoa there, Shakespeare! Shorten that a little, will ya?",
      ],
      minlength: [
        3,
        "I'm not going to remember it unless it's at least three characters.",
      ],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, "Price required"],
      min: [1, "It's got to be at least 1 gold. I'm running a business here!"],
    },
    curseLevel: {
      type: String,
      required: [true, "Curse level required"],
      enum: {
        values: ["HIGH", "MED", "LOW"],
        message: "Curse levels: HIGH, MED, or LOW",
      },
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
      enum: {
        values: [
          "sword",
          "knife",
          "broadsword",
          "machete",
          "dagger",
          "magicsword",
        ],
        message:
          "Needs to be a sword, knife, broadsword, machete, dagger, or magicsword",
      },
    },
    adventurersClub: {
      type: Boolean,
      default: false,
      // select: false
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Document middleware
itemSchema.pre("save", function (next) {
  this.slug = slugify(this.productName, { lower: true })
  next()
})

// Query middleware
itemSchema.pre(/^find/, function (next) {
  this.find({ adventurersClub: { $ne: true } })
  next()
})

// Aggregation middleware
itemSchema.pre("aggregate", function (next) {
  // console.log(this.pipeline())
  this.pipeline().unshift({
    $match: { adventurersClub: { $ne: true } },
  })
  next()
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item
