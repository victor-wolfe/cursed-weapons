const fs = require("fs")

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8")
const storeStock = JSON.parse(data)
const slugs = storeStock.map((el) => slugify(el.productName, { lower: true }))

exports.getInventory = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: storeStock.length,
    data: {
      inventory: storeStock,
    },
  })
}
