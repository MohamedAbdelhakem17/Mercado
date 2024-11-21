const express = require("express");
const {
  createObjectFilter,
  getAllReview,
  assignProductIdToBody,
  getOneReview,
  deleteReview,
  updateReview,
} = require("../controller/reviewController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createObjectFilter, getAllReview)
  .post(assignProductIdToBody);

router.route("/:id").get(getOneReview).put(updateReview).delete(deleteReview);
module.exports = router;
