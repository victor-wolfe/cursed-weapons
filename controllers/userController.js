const User = require("../models/userModel")
const AppError = require("../utils/appError")

const catchAsync = require("../utils/catchAsync")
const factory = require("./factoryFunctions")

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.getallUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  })
})

exports.updateProfile = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "This route is not for pssword updates. Please use /updatePassword",
        400
      )
    )
  // 2) Filter out unwanted field names (such as role)
  const filteredBody = filterObj(req.body, "name", "email")

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  })
})

exports.deactivateUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })
  res.status(204).json({
    status: "success",
    data: null,
  })
})

exports.getUser = (req, res) =>
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  })

//do NOT update passwords with this function
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)
