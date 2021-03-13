const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")

const return404 = () => next(new AppError("Sorry, I couldn't find that.", 404))

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) return404()
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

    if (!doc) return404()
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

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    if (popOptions) query = query.populate("reviews")

    const doc = await query

    if (!doc) {
      return next(new AppError("No doc found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    })
  })

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Allows for nested GET reviews on item routes
    let filter = {}
    if (req.params.tourId) filter = { item: req.params.itemId }

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const docs = await features.query

    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    })
  })
