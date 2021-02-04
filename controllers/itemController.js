const Item = require("../models/itemModel")
const APIFeatures = require("../utils/APIFeatures")

// const slugs = storeStock.map((el) => slugify(el.productName, { lower: true }))

exports.getAllItems = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err,
    })
  }
}

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    res.status(200).json({
      status: "Success",
      data: {
        inventory: item,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    })
  }
}

exports.addItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body)
    res.status(200).json({
      status: "success",
      data: {
        tour: newItem,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    })
  }
}

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    })
    res.status(201).json({
      status: "success",
      data: {
        inventory: item,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    })
  }
}

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    })
  }
}

// Aggregate Stats
exports.getItemStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    })
  }
}
