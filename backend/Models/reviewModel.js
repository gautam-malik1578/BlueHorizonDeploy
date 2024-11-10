import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    index: true,
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    index: true,
  },
  attraction: {
    type: mongoose.Schema.ObjectId,
    ref: "Attraction",
    index: true,
  },
  attractionName: {
    type: String,
    default: "",
  },
  attractionImg: {
    type: String,
    default: "",
  },
  author: {
    type: String,
  },
  authorAvatar: {
    type: String,
    default: "default",
  },
  authorAvatarUrl: {
    type: String,
    default:
      "https://st2.depositphotos.com/1069290/44761/v/450/depositphotos_447612982-stock-illustration-cute-young-man-avatar-character.jpg",
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
});
// how will i gain access to the city id(we must wite a review on city ask it on the req itself find it's id and see what happens) and user id (must be logged in so req.user.id )
reviewSchema.statics.updateAvatar = async function (userId, newAvatar, newUrl) {
  await this.updateMany(
    { user: userId },
    { $set: { authorAvatar: newAvatar, authorAvatarUrl: newUrl } }
  );
  //how do i find all reviews by a user and update the their avatar?
};
const Review = mongoose.model("Review", reviewSchema);
export default Review;
