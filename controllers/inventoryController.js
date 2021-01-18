const fs = require("fs")

const data = fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
const storeStock = JSON.parse(data)
// const slugs = storeStock.map((el) => slugify(el.productName, { lower: true }))

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
  const item = storeStock.find((obj) => {
    return obj.id == req.params.id.slice(1)
  })
  if (item) {
    res.status(200).json({
      status: "Success",
      data: {
        inventory: item,
      },
    })
  } else {
    res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
}
