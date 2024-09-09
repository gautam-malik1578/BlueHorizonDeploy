import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createAReplyOnAReview,
  deleteAReply,
  deleteAllReplies,
  deleteAllrepliesOnAReview,
  getAllReplies,
  getAllrepliesOnAReview,
  updateAReply,
} from "../controllers/repliesController.js";
const router = express.Router();
router
  .route("/")
  .get(protect, restrictTo("admin"), getAllReplies)
  .delete(protect, restrictTo("admin"), deleteAllReplies);
router
  .route("/review/:reviewId")
  .get(protect, getAllrepliesOnAReview)
  .delete(protect, restrictTo("admin"), deleteAllrepliesOnAReview)
  .post(protect, createAReplyOnAReview);
router
  .route("/review/:reviewId/reply/:replyId")
  .patch(protect, updateAReply)
  .delete(protect, deleteAReply);
export { router };
