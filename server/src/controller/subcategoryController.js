const Factory = require("./factoryHandler")
const SubCategoryModel = require("../models/subcategoryModel")


exports.getAllCategory = Factory.getAll(SubCategoryModel)
exports.getOneCategory = Factory.getOne(SubCategoryModel)
exports.addNewCategory = Factory.createOne(SubCategoryModel)
exports.deleteCategory = Factory.deleteOne(SubCategoryModel)
exports.updateCategory = Factory.updateOne(SubCategoryModel)

