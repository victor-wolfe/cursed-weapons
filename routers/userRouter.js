const express = require("express")

const {
  getallUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController")

// Routes
const router = express.Router()

router.route("/").get(getallUsers).post(createUser)
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
