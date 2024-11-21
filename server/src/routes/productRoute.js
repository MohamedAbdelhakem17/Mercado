const express = require("express");
const {
  getAllProduct,
  addProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  imageManipulations,
  imageProductUpload,
} = require("../controller/productController");
const slugifyMiddleware = require("../middlewares/slugifuyMiddleware");

const router = express.Router();

// Nested Route
const reviewRoute = require("./reviewRoute")

router.use("/:productId/review", reviewRoute)

router
  .route("/")
  .get(getAllProduct)
  .post(
    imageProductUpload,
    imageManipulations,
    slugifyMiddleware("title"),
    addProduct
  );

router.
  route("/:id")
  .get(getOneProduct)
  .put(
    imageProductUpload,
    imageManipulations,
    slugifyMiddleware("title"),
    updateProduct
  )
  .delete(deleteProduct);

module.exports = router;
