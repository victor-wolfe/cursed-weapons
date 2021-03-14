const express = require("express")
const authController = require("./../controllers/authController")
const {
  getallUsers,
  getUser,
  getProfile,
  updateUser,
  deleteUser,
  updateProfile,
  deactivateUser,
} = require("./../controllers/userController")

// Routes
const router = express.Router()

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/forgotPassword", authController.forgotPassword)
router.patch("/resetPassword/:token", authController.resetPassword)
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
)

// Must be logged in for all routes after this point
router.user(authController.protect)

router.get("/profile", getProfile, getUser)
router.patch("/updateProfile", updateProfile)
router.delete("/deleteAccount", deactivateUser)

// Only admins can view users
router.use(authController.restrictTo("admin"))

router.route("/").get(authController.restrictTo("admin"), getallUsers)
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
