const Factory = require("./factoryHandler")
const SubCategoryModel = require("../models/subcategoryModel")


exports.createObjectFilter = (req, res, next) => {
    const filter = req.params.categoryId
        ? { category: req.params.categoryId }
        : {}
    req.body.filter = filter
    next()
}

exports.assignCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId
    next()
}

exports.getAllCategory = Factory.getAll(SubCategoryModel)
exports.getOneCategory = Factory.getOne(SubCategoryModel)
exports.addNewCategory = Factory.createOne(SubCategoryModel)
exports.deleteCategory = Factory.deleteOne(SubCategoryModel)
exports.updateCategory = Factory.updateOne(SubCategoryModel)

