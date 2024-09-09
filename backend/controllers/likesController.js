import Like from "../Models/likes.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllAttractionsLikedByMe = catchAsync(async (req, res, next) => {
  const likedAttractions = await Like.find({ user: req.user.id }).populate(
    "attractionsIds"
  );
  const length = likedAttractions.length;
  res.status(200).json({
    status: "success",
    length,
    data: { likedAttractions },
  });
});
