const sharp = require("sharp")
const { v4: uuid4 } = require("uuid")
const Factory = require("./factoryHandler")
const { uploadSingleImage } = require("../util/imageUploading")
const CategoryModel = require("../models/categoryModel")

exports.imageCategoryUpload = uploadSingleImage("image");

exports.imageManipulations = async (req, res, next) => {
    if (req.file) {
        const imageCover = `category-${uuid4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
            .resize(200, 200)
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
            .toFile(`uploads/categories/${imageCover}`)
        req.body.image = imageCover
    }
    next()
}



exports.getAllCategory = Factory.getAll(CategoryModel)
exports.getOneCategory = Factory.getOne(CategoryModel)
exports.addNewCategory = Factory.createOne(CategoryModel)
exports.deleteCategory = Factory.deleteOne(CategoryModel)
exports.updateCategory = Factory.updateOne(CategoryModel)

