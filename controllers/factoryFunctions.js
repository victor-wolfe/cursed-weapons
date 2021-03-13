const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")

const message404 = "Sorry, what were you looking for again?"

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError(message404, 404))
    }
    res.status(204).json({
      status: "success",
      data: null,
    })
  })

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError(message404, 404))
    }
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    })
  })

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    })
  })
