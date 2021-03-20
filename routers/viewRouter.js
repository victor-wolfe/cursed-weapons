const express = require("express")

const { getOverview, getItem } = require("../controllers/viewController")

const router = express.Router()

router.get("/", getOverview)
router.get("/item", getItem)

module.exports = router
