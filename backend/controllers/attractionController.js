import Attraction from "../Models/attractionModel.js";
import City from "../Models/cityModel.js";
import Favorite from "../Models/favoritesModel.js";
import Like from "../Models/likes.model.js";
import { AppError } from "../utils/Error.js";
import { catchAsync } from "../utils/catchAsync.js";
export const getAllAttraction = catchAsync(async (req, res, next) => {
  const attractions = await Attraction.find();
  const length = attractions.length;
  res.status(200).json({
    status: "success",
    length,
    data: { attractions },
  });
});

export const createMultipleAttractions = catchAsync(async (req, res, next) => {
  const { cityId } = req.params;

  // Ensure `req.body.attractions` is an array of attraction objects
  const attractionsData = req.body.attractions.map((attraction) => ({
    ...attraction,
    cityId,
  }));

  // Insert all attractions in a single database operation
  const attractions = await Attraction.insertMany(attractionsData);

  // Collect attraction names and the first image of each attraction
  const attractionNames = [];
  const attractionImages = [];
  attractions.forEach((attraction) => {
    attractionNames.push(attraction.attractionName);
    if (attraction.imgs && attraction.imgs.length > 0) {
      attractionImages.push(attraction.imgs[0]);
    }
  });

  // Update the City document with the attraction names and first images
  await City.findByIdAndUpdate(cityId, {
    $addToSet: {
      todos: { $each: attractionNames },
      imgs: { $each: attractionImages },
    },
  });

  res.status(200).json({
    status: "success",
    message: "Attractions successfully created",
    data: { attractions },
  });
});

export const createAttraction = catchAsync(async (req, res, next) => {
  const attraction = await Attraction.create({
    ...req.body,
    cityId: req.params.cityId,
  });
  res.status(200).json({
    status: "success",
    message: "the attraction successfully created",
    data: { attraction },
  });
  await City.addAttractionToCity(req.params.cityId, attraction.attractionName);
});
export const getAllAtractionsofACity = catchAsync(async (req, res, next) => {
  const attractions = await Attraction.find({ cityId: req.params.cityId });
  //   attractions.forEach(async (attraction) => {
  //     attraction.isFav = await Favorite.checkIsFav(req.user.id, attraction.id);
  //     console.log("boi this is what we need to do", attraction.isFav);
  //     await attraction.save();
  //   });

  const allAttractionIds = attractions.map((attraction) => attraction.id);
  const isFavs = await Favorite.find({
    user: req.user.id,
    attractionIds: { $in: allAttractionIds },
  });
  //   console.log("boi this is isFavs==============>>>>>>>>>>>>", isFavs);
  //   await Promise.all(
  //     attractions.map(async (attraction) => {
  //       attraction.isFav = await Favorite.checkIsFav(req.user.id, attraction.id);
  //       console.log("boi this is what we need to do", attraction.isFav);
  //       await attraction.save();
  //     })
  //   );
  if (attractions.length !== 0) {
    for (const attraction of attractions) {
      attraction.isFav = isFavs.some((fav) =>
        fav.attractionIds.includes(attraction.id)
      );
      await attraction.save();
    }
  }
  const length = attractions.length;
  res.status(200).json({
    status: "success",
    length,
    data: { attractions },
  });
});
export const toggelLike = catchAsync(async (req, res, next) => {
  //1)fetch the doc in question
  const toIncLike = await Like.addToLike(req.user.id, req.params.attractionId);
  let updationQuery;
  if (toIncLike) {
    updationQuery = {
      isLiked: true,
      $inc: {
        likes: 1,
      },
    };
  } else {
    updationQuery = {
      isLiked: false,
      $inc: {
        likes: -1,
      },
    };
  }
  const attraction = await Attraction.findByIdAndUpdate(
    req.params.attractionId,
    updationQuery,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      attraction,
    },
  });
});
// export const removeLiketoAttraction = catchAsync(async (req, res, next) => {});
export const findPopularAttraction = catchAsync(async (req, res, next) => {
  const maxAttractions =
    Number(req.params.max) <= 7 ? Number(req.params.max) : 7;
  const popularAttractions = await Attraction.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(maxAttractions); // Limit the results to the top three attractions
  const length = popularAttractions.length;
  res.status(200).json({
    status: "success",
    length,
    data: { popularAttractions },
  });
});
export const findattractionByName = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = 5 * (page - 1);
  const attractions = await Attraction.find({
    attractionName: req.params.attractionName,
  })
    .skip(skip)
    .limit(5);
  const length = attractions.length;
  res.status(200).json({
    status: "success",
    length,
    data: { attractions },
  });
});
