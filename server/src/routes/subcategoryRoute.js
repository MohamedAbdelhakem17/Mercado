const express = require("express");
const slugifuyMiddleware = require("../middlewares/slugifuyMiddleware")

const {
    getAllCategory,
    getOneCategory,
    deleteCategory,
    addNewCategory,
    updateCategory,
} = require("../controller/subcategoryController");

const router = express.Router();

router
    .route("/")
    .get(getAllCategory)
    .post(slugifuyMiddleware("name"), addNewCategory);
router
    .route("/:id")
    .get(getOneCategory)
    .put(slugifuyMiddleware("name"), updateCategory)
    .delete(deleteCategory);

module.exports = router;
