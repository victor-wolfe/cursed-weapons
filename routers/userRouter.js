const express = require("express")
const authController = require("./../controllers/authController")
const {
  getallUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController")

// Routes
const router = express.Router()

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/forgotPassword", authController.forgotPassword)
router.patch("/resetPassword/:token", authController.resetPassword)

router.route("/").get(authController.protect, getallUsers).post(createUser)
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
