const Item = require("../models/itemModel")
const APIFeatures = require("../utils/APIFeatures")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

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

exports.getItem = catchAsync(async (req, res) => {
  const item = await Item.findById(req.params.id).populate("reviews")
  res.status(200).json({
    status: "Success",
    data: {
      inventory: item,
    },
  })
})

exports.addItem = catchAsync(async (req, res) => {
  const newItem = await Item.create(req.body)
  res.status(200).json({
    status: "success",
    data: {
      tour: newItem,
    },
  })
})

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

exports.deleteItem = catchAsync(async (req, res) => {
  await Item.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: "success",
    data: null,
  })
})

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
