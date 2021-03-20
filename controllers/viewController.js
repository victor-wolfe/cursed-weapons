const Item = require("../models/itemModel")
const catchAsync = require("../utils/catchAsync")

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) get item data from collection
  const items = await Item.find()

  // 2) build template
  // 3) render template using item data from 1
  res.status(200).render("overview", {
    title: "Full inventory",
    items,
  })
})

exports.getItem = (req, res) => {
  res.status(200).render("item", {
    title: "Dummy Item",
  })
}
