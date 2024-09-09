import Favorite from "../Models/favoritesModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const setFav = catchAsync(async (req, res, next) => {
  //will get user id from request itself then what ?
  const favs = await Favorite.findOneAndUpdate(
    { user: req.user.id },
    { $addToSet: { attractionIds: req.params.attractionId } },
    { new: true, upsert: true, runValidators: true }
  );
  //   console.log("the params are ============>", req.params);
  //   //   console.log(favs);
  //   if (favs == null) {
  //     console.log("boi the favs turned out to be null");
  //     favs = await Favorite.create({ user: req.user.id });
  //   }
  //   favs.attractionIds.push(req.params.attractionId);
  //   favs.save();
  res.status(200).json({
    status: "success",
    data: { favs },
  });
});
export const removeFav = catchAsync(async (req, res, next) => {
  const favs = await Favorite.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { attractionIds: req.params.attractionId } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: { favs },
  });
});
// export const toggelFav = catchAsync(async (req, res, next) => {});
export const findMyFavsAttraction = catchAsync(async (req, res, next) => {
  const favAttractions = await Favorite.find({
    user: req.user.id,
  }).populate("attractionIds");
  const length = favAttractions.length;
  res.status(200).json({
    status: "success",
    length,
    data: { favAttractions },
  });
});
