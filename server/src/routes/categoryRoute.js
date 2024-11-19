const express = require("express");
const slugifyMiddleware = require("../middlewares/slugifuyMiddleware")

const {
    getAllCategory,
    getOneCategory,
    deleteCategory,
    addNewCategory,
    updateCategory,
    imageCategoryUpload,
    imageManipulations,
} = require("../controller/categoryController");

const router = express.Router();

router
    .route("/")
    .get(getAllCategory)
    .post(imageCategoryUpload, imageManipulations, slugifyMiddleware("name"), addNewCategory);
router
    .route("/:id")
    .get(getOneCategory)
    .put(imageCategoryUpload, imageManipulations, slugifyMiddleware("name"), updateCategory)
    .delete(deleteCategory);

module.exports = router;