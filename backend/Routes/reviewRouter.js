import express from "express";
import { protect } from "../controllers/authController.js";
import {
  createReviewOnAttractionOfCity,
  deleteAReview,
  deleteAllReview,
  getAllReviews,
  getReviewByUser,
  getReviewOnCity,
  updateAReview,
} from "../controllers/reviewController.js";
const router = express.Router();
router.route("/").get(getAllReviews).delete(deleteAllReview);
router.route("/myreviews").get(protect, getReviewByUser);
router
  .route("/city/:cityId/attraction/:attractionId")
  .post(protect, createReviewOnAttractionOfCity)
  .get(protect, getReviewOnCity);
router
  .route("/:reviewId")
  .delete(protect, deleteAReview)
  .patch(protect, updateAReview);
export { router };
