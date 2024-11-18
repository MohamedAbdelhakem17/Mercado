const express = require("express")

const { getAllCategory, getOneCategory, deleteCategory, addNewCategory, updateCategory } = require("../controller/categoryController")

const router = express.Router()

router.route("/").get(getAllCategory).post(addNewCategory)
router.route("/:id").get(getOneCategory).put(updateCategory).delete(deleteCategory)

module.exports = router