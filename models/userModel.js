const crypto = require("crypto")
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const Item = require("./itemModel")

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
  favorites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: Item,
    },
  ],
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
})

// Check & encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

// If password has been changed, set time it was changed
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()
  // set 1 second in the past to ensure token is created after password changed
  this.passwordChangedAt = Date.now() - 1000
  next()
})

// populate a user's favorites
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "favorites",
    // select: "-__v",
  })
  next()
})

//filter out inactive users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

// Compare encrypted passwords to validate
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

// Check whether PW has been changed
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return JWTTimestamp < changedTimestamp
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  // Create a reset token
  const resetToken = crypto.randomBytes(32).toString("hex")
  // Encrypt the reset token to save to the DB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  // Set token to expire in 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  console.log({ resetToken }, this.passwordResetToken)

  // return unencrypted reset token (to email user)
  return resetToken
}

const User = mongoose.model("User", userSchema)

module.exports = User
