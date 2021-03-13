const Item = require("../models/itemModel")
const APIFeatures = require("../utils/APIFeatures")
const AppError = require("../utils/appError")

const catchAsync = require("../utils/catchAsync")

// Get the entire inventory
exports.getAllItems = catchAsync(async (req, res) => {
  const features = new APIFeatures(Item.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const items = await features.query
  res.status(200).json({
    status: "Success",
    results: items.length,
    data: {
      inventory: items,
    },
  })
})

// Get an individual item by ID
exports.getItem = catchAsync(async (req, res) => {
  const item = await Item.findById(req.params.id).populate("reviews")
  if (!item) {
    return next(new AppError("Item not found", 404))
  }
  res.status(200).json({
    status: "Success",
    data: {
      inventory: item,
    },
  })
})

// Add an item
exports.addItem = catchAsync(async (req, res) => {
  const newItem = await Item.create(req.body)
  res.status(200).json({
    status: "success",
    data: {
      tour: newItem,
    },
  })
})

// Update an item
exports.updateItem = catchAsync(async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  })
  res.status(201).json({
    status: "success",
    data: {
      inventory: item,
    },
  })
})

// Delete an item

exports.deleteItem = factory.deleteOne(Item)

// Aggregate Stats
exports.getItemStats = catchAsync(async (req, res) => {
  const stats = await Item.aggregate([
    {
      $group: {
        _id: { type: "$type" },
        numItems: { $sum: 1 },
      },
    },
  ])

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  })
})
