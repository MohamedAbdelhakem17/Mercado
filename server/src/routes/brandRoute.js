const express = require("express");
const slugifyMiddleware = require("../middlewares/slugifuyMiddleware")

const {
    getAllBrand,
    getOneBrand,
    deleteBrand,
    addNewBrand,
    updateBrand,
    imageBrandUpload,
    imageManipulations,
} = require("../controller/brandController");

const router = express.Router();


router
    .route("/")
    .get(getAllBrand)
    .post(imageBrandUpload, imageManipulations, slugifyMiddleware("name"), addNewBrand);
router
    .route("/:id")
    .get(getOneBrand)
    .put(imageBrandUpload, imageManipulations, slugifyMiddleware("name"), updateBrand)
    .delete(deleteBrand);

module.exports = router;
