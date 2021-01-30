const fs = require("fs")

const data = fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
const storeStock = JSON.parse(data)
// const slugs = storeStock.map((el) => slugify(el.productName, { lower: true }))

const getItem = (reqId) => {
  return storeStock.find(({ id }) => id == reqId)
}

exports.checkID = (req, res, next, val) => {
  const item = getItem(req.params.id)
  if (!item) {
    res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  } else next()
}

exports.getInventory = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: storeStock.length,
    data: {
      inventory: storeStock,
    },
  })
}

exports.getItem = (req, res) => {
  console.log(`ID: ${req.params.id}`)
  const item = getItem(req.params.id)
  res.status(200).json({
    status: "Success",
    data: {
      inventory: item,
    },
  })
}

exports.addItem = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  })
}

exports.updateItem = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  })
}

exports.deleteItem = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  })
}
