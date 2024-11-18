const Factory = require("./factoryHandler")


exports.getAllCategory = Factory.getAll()
exports.getOneCategory = Factory.getOne()
exports.addNewCategory = Factory.createOne()
exports.deleteCategory = Factory.deleteOne()
exports.updateCategory = Factory.updateOne()

