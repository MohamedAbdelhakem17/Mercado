const Factory = require("./factoryHandler")
const ReviewMode = require("../models/reviewModel")


exports.createObjectFilter = (req, res, next) => {
    const filter = req.params.productId
        ? { product: req.params.productId }
        : {}
    req.body.filter = filter
    next()
}

exports.assignProductIdToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId
    next()
}


exports.getAllReview = Factory.getAll(ReviewMode)
exports.getOneReview = Factory.getOne(ReviewMode)
exports.addNewReview = Factory.createOne(ReviewMode)
exports.deleteReview = Factory.deleteOne(ReviewMode)
exports.updateReview = Factory.updateOne(ReviewMode)

