const fs = require("fs")

const data = fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
const storeStock = JSON.parse(data)
// const slugs = storeStock.map((el) => slugify(el.productName, { lower: true }))

const getItem = (id) =>
  storeStock.find((el) => {
    return el.id == id.slice(1)
  })

exports.checkID = (req, res, next, val) => {
  console.log(req.params.id)
  const item = getItem(req.params.id)
  if (!item) {
    res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
  next()
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
