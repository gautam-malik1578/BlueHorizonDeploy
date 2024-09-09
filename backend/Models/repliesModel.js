import mongoose from "mongoose";
const repliesSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "unknown",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  reviewId: {
    type: mongoose.Schema.ObjectId,
    ref: "Review",
    required: true,
  },
  replyTo: {
    type: String,
    required: true,
    default: "not mentioned",
  },
  content: {
    type: String,
    required: true,
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
  replyOnReview: {
    type: Boolean,
    default: true,
  },
});
const Reply = mongoose.model("Reply", repliesSchema);
export default Reply;
