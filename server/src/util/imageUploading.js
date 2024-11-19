const multer = require("multer")

const imageUpload = () => {
    const storage = multer.memoryStorage()

    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) cb(null, true)
        else cb("This is Not Valid  Image", false);
    }

    const upload = multer({ fileFilter, storage })
    return upload
}

exports.uploadSingleImage = (image) => imageUpload().single(image)
exports.uploadManyImage = (images) => imageUpload().fields(images)