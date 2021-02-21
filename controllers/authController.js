const { promisify } = require("util")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require("./../utils/appError")

// Produces JWT token based on user ID
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// Create new user
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  const token = signToken(newUser._id)

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  })
})

// Login existing user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  // 1) Check if email/password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400))
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401))
  }

  // 3) Send token to client
  const token = signToken(user._id)
  return res.status(200).json({
    status: "success",
    token,
  })
})

// Protects routes from being accessed if the user is not logged in
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Check if token exists
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) return next(new AppError("Please log in to view this page.", 401))

  // 2) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(new AppError("This user no longer exists.", 401))
  }

  // 4) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("Password has been changed. Please log in again", 401)
    )
  }

  // Grant access to protected route
  req.user = currentUser
  next()
})
