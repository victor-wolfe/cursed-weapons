const Item = require("../models/itemModel")

const catchAsync = require("../utils/catchAsync")
const factory = require("./factoryFunctions")

// Get the entire inventory
exports.getAllItems = factory.getAll(Item)

// second arg is a field to populate
exports.getItem = factory.getOne(Item, { path: "reviews" })

// create, update, and delete
exports.addItem = factory.createOne(Item)
exports.updateItem = factory.updateOne(Item)
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
