const slugify = require("slugify")
const path = require("path")

let imgDir = path.join(__dirname, "..", "images")

module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(
    /{%IMAGE%}/g,
    `<img src="${imgDir}/${product.id}.png"`
  )
  output = output.replace(/{%CURSE_LEVEL%}/g, product.curseLevel)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(
    /{%SLUG%}/g,
    slugify(product.productName, { lower: true })
  )
  return output
}
