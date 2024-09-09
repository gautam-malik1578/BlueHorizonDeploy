import Review from "../Models/reviewModel.js";
import User from "../Models/userModel.js";
import { AppError } from "../utils/Error.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createReviewOnAttractionOfCity = catchAsync(
  async (req, res, next) => {
    console.log("boi we did reach the req>>>>>>>>>>>>>>>>>>");
    const review = await Review.create({
      ...req.body,
      user: req.user.id,
      attraction: req.params.attractionId,
      city: req.params.cityId,
      author: req.user.username,
      authorAvatar: req.user.avatar,
      authorAvatarUrl: req.user.avatarUrl,
    });
    // const user = await User.findById(req.user.id);
    // review.authorAvatar = user.avatar; //this is temporary
    // await review.save();
    res.status(200).json({ status: "success", data: { review } });
  }
);
export const getReviewOnCity = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({
    attraction: req.params.attractionId,
    city: req.params.cityId,
  });
  //here will come the part to set isdeletable or in virtual property
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});
export const getReviewByUser = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    data: { reviews },
  });
});

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({});
  const length = reviews.length;
  res.status(200).json({
    status: "success",
    length,
    data: { reviews },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {});
export const deleteAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.deleteMany({});
  res.status(204).json({
    status: "success",
    data: null,
  });
});
export const deleteAReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndDelete({
    user: req.user.id,
    _id: req.params.reviewId,
  });
  if (review === null) {
    console.log("the review when deleting is💥💥💥💥💥💥💥💥💥💥 ", review);
    return next(new AppError("can't deleted this review", 400));
  }
  res.status(200).json({
    status: "success",
    message: "review deleted successfully",
    data: null,
  });
});
export const updateAReview = catchAsync(async (req, res, next) => {
  if (req.body.content === "") {
    return next(
      new AppError("can't update to empty ,try updated instead", 400)
    );
  }
  const review = await Review.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.reviewId,
    },
    { content: req.body.content },
    { new: true }
  );
  if (review === null) {
    console.log("the review when deleting is ", review);
    return next(new AppError("can't update others review", 400));
  }
  review.isUpdated = true;
  await review.save();
  res.status(200).json({
    status: "success",
    message: "review deleted successfully",
    data: {
      review,
    },
  });
});
