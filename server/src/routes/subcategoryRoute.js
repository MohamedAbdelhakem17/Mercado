const express = require("express");
const slugifuyMiddleware = require("../middlewares/slugifuyMiddleware")

const {
    getAllCategory,
    createObjectFilter,
    getOneCategory,
    deleteCategory,
    addNewCategory,
    assignCategoryIdToBody,
    updateCategory,
} = require("../controller/subcategoryController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(createObjectFilter, getAllCategory)
    .post(assignCategoryIdToBody, slugifuyMiddleware("name"), addNewCategory);
router
    .route("/:id")
    .get(getOneCategory)
    .put(slugifuyMiddleware("name"), updateCategory)
    .delete(deleteCategory);

module.exports = router;
