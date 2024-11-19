const express = require("express");
const slugifyMiddleware = require("../middlewares/slugifuyMiddleware")

const {
    getAllCategory,
    createObjectFilter,
    getOneCategory,
    deleteCategory,
    addNewCategory,
    assignCategoryIdToBody,
    updateCategory,
    imageCategoryUpload,
    imageManipulations,
} = require("../controller/categoryController");

const router = express.Router();

// Nested Route 
const SubcategoryRoute = require("./subcategoryRoute");

router.use("/:categoryId/subcategory", SubcategoryRoute)

router
    .route("/")
    .get(createObjectFilter, getAllCategory)
    .post(imageCategoryUpload, imageManipulations, slugifyMiddleware("name"),assignCategoryIdToBody,addNewCategory);
router
    .route("/:id")
    .get(getOneCategory)
    .put(imageCategoryUpload, imageManipulations, slugifyMiddleware("name"), updateCategory)
    .delete(deleteCategory);

module.exports = router;
