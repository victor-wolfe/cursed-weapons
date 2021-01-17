const fs = require("fs")
const http = require("http")
const url = require("url")
const slugify = require("slugify")

//synchronous version is fine because this is only called once, when the server is started
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
)

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8")
const dataObj = JSON.parse(data)
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }))
const replaceTemplate = require("./modules/replaceTemplate")

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)
  // /whatever?=stuff, query = stuff
  // pathname = /whatever
  const slug = slugs.indexOf(query)

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("")

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml)

    res.end(output)

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.end(output)

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" })
    res.end(data)

    // 404
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    })
    res.end("<h1>Page not found</h1>")
  }
})

// port, localhost, callback
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000")
})
