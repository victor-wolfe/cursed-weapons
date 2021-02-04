class APIFeatures {
  constructor(query, queryRequests) {
    this.query = query
    this.queryRequests = queryRequests
  }
  filter() {
    // Create shallow copy of the request
    const queryObj = { ...this.queryRequests }

    // Remove excluded fields
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach((el) => delete queryObj[el])

    // Capture operators
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort() {
    if (this.queryRequests.sort) {
      const sortBy = this.queryRequests.sort.split(",").join(" ")
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort("-createdAt")
    }
    return this
  }

  limitFields() {
    if (this.queryRequests.fields) {
      const fields = this.queryRequests.fields.split(",").join(" ")
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select("-__v")
    }
    return this
  }

  paginate() {
    const page = this.queryRequests.page * 1 || 1
    const limit = this.queryRequests.limit * 1 || 5
    const skip = (page - 1) & limit

    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

module.exports = APIFeatures
