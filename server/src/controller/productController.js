const sharp = require("sharp")
const { v4: uuid4 } = require("uuid")
const Factory = require("./factoryHandler")
const { uploadManyImage } = require("../util/imageUploading")
const productModel = require("../models/productModel")

// Middleware for handling product image uploads
exports.imageProductUpload = uploadManyImage([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 5 },
])

// Middleware for image processing
exports.imageManipulations = async (req, res, next) => {
    if (req.files.imageCover) {
        const imageCover = `product-${uuid4()}-${Date.now()}-cover.jpeg`
        await sharp(req.files.imageCover[0].buffer)
            .to.resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageCover}`);
        req.body.imageCover = imageCover;
    }

    if (req.files.images) {
        const listOfImages = [];
        await Promise.all(
            req.files.images.map(async (image, index) => {
                const imageFileName = `product-${uuid4()}-${Date.now()}-${index + 1}.jpeg`;
                await sharp(image.buffer)
                    .resize(2000, 1333)
                    .toFormat("jpeg")
                    .jpeg({ quality: 95 })
                    .toFile(`uploads/products/${imageFileName}`);
                listOfImages.push(imageFileName);
            })
        );
        req.body.images = listOfImages;
    }

    next();
}


// CRUD Handlers
exports.getAllProduct = Factory.getAll(productModel);    // Get all products
exports.getOneProduct = Factory.getOne(productModel);    // Get a single product
exports.addProduct = Factory.createOne(productModel);    // Add a new product
exports.updateProduct = Factory.updateOne(productModel); // Update a product
exports.deleteProduct = Factory.deleteOne(productModel); // Delete a product
