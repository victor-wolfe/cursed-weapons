const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Name required"],
    unique: true,
    trim: true,
  },
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
  },
})
