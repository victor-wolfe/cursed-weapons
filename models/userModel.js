const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already taken"],
    trim: true,
    lowercase: true,
    maxlength: [15, "Username must have 15 or fewer characters"],
    minlength: [3, "Username must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already registered."],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Email is invalid."],
  },
  image: {
    type: String,
    validate: {
      validator: function (el) {
        return el.match(/^[\w_]+\.(png|gif|jpg|jpeg)$/)
      },
      message: "Invalid image. Must be png, gif, or jpg.",
    },
    default: "generic.png",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters."],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on SAVE
      validator: function (el) {
        return el === this.password
      },
      message: "Passwords do not match",
    },
  },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User
