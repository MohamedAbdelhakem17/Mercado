const sharp = require("sharp")
const { v4: uuid4 } = require("uuid")
const Factory = require("./factoryHandler")
const { uploadSingleImage } = require("../util/imageUploading")
const BrandModel = require("../models/brandModel")

exports.imageBrandUpload = uploadSingleImage("image");

exports.imageManipulations = async (req, res, next) => {
    if (req.file) {
        const imageCover = `Brand-${uuid4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
            .resize(200, 200)
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
            .toFile(`uploads/brands/${imageCover}`)
        req.body.image = imageCover
    }
    next()
}

exports.getAllBrand = Factory.getAll(BrandModel)
exports.getOneBrand = Factory.getOne(BrandModel)
exports.addNewBrand = Factory.createOne(BrandModel)
exports.deleteBrand = Factory.deleteOne(BrandModel)
exports.updateBrand = Factory.updateOne(BrandModel)

