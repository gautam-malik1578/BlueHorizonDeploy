import City from "../Models/cityModel.js";
import { AppError } from "../utils/Error.js";
import { catchAsync } from "../utils/catchAsync.js";
export const getCities = catchAsync(async (req, res, next) => {
  const excludedFields = ["sort", "page", "limit", "fields"];
  //
  const queryObj = { ...req.query };
  excludedFields.forEach((el) => delete queryObj[el]);
  console.log("the a--------------------->>>>>>>>>>>>>>>>>>>>>>..😎", queryObj);
  //
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  console.log("the queryString is this :>>>>>>>>>>>>>>>>>>", queryString);
  let query = City.find(JSON.parse(queryString));
  if (req.query.fields) {
    const fields = req.query?.fields?.split(",").join(" ");
    query = query.select("-__v");
    query = query.select(fields);
    console.log("yee boi we reached here ,👍👍👍👍👍👍👍👍 111111");
  } else {
    query = query.select("-__v");
    console.log("yee boi we reached here ,👍👍👍👍👍👍👍👍2222222");
  }
  //pagination//
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numCities = await City.countDocuments();
    if (skip > numCities) {
      return next(new AppError("page was not found"));
    }
  }

  //finally executing the query
  const cities = await query;
  //   console.log("the cities that we found are >>>>>>>>", cities);
  // if (cities.length === 0) {
  //   return next(new AppError("we don't have any city info at the moment", 404));
  // }
  res.status(200).json({
    status: "success",
    length: cities.length,
    data: { cities },
  });
});
export const createCity = catchAsync(async (req, res, next) => {
  const city = await City.create({
    ...req.body,
    location: {
      type: "Point",
      coordinates: [req.body.lng, req.body.lat],
    },
  });
  if (!city) {
    return next(new AppError("could not create the city in db", 303));
  }
  res.status(200).json({
    status: "success",
    data: { city },
  });
});
export const findCityBYName = catchAsync(async (req, res, next) => {
  //   console.log("========......>>>>>>>", req.params);
  const city = await City.findOne({ cityName: `${req.params.cityName}` });
  if (!city) {
    return next(
      new AppError(`we could not find any error by ${req.params.cityName}`, 200)
    );
  }
  res.status(200).json({
    status: "success",
    data: { city },
  });
});
export const deleteCityByName = catchAsync(async (req, res, next) => {
  const city = await City.deleteOne({ cityName: `${req.params.cityName}` });
  res.status(200).json({ status: "success", data: null });
});
export const findNearCity = catchAsync(async (req, res, next) => {
  const cities = await City.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [req.params.lng, req.params.lat],
        },
        $maxDistance: req.params.dis * 1000,
      },
    },
  });
  res.status(200).json({
    status: "success",
    length: cities.length,
    data: { cities },
  });
});
export const deleteAllCity = catchAsync(async (req, res, next) => {
  const cities = await City.deleteMany({});
  res.status(200).json({ status: "success", data: { cities } });
});
// export const getAllCity = catchAsync(async (req, res, next) => {
//   const cities = await City.find({});
//   res.status.json({
//     status: "success",
//     data: { cities },
//   });
// });
export const findCityViaAttractionName = catchAsync(async (req, res, next) => {
  const { attractionName } = req.params;

  // Construct a regex pattern to match similar todo items
  const regex = new RegExp(attractionName, "i"); // "i" for case-insensitive match

  // Find cities where the todo items match the regex pattern
  const cities = await City.find({ todos: regex }).limit(5);
  const length = cities.length;

  res.status(200).json({
    status: "success",
    length,
    data: {
      cities,
    },
  });
});
