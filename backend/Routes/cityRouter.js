import express from "express";
import {
  createCity,
  deleteAllCity,
  deleteCityByName,
  findCityBYName,
  findCityViaAttractionName,
  findNearCity,
  getCities,
  setCityData,
} from "../controllers/cityController.js";
import { protect, restrictTo } from "../controllers/authController.js";
const router = express.Router();
router.route("/").get(getCities).post(createCity).delete(deleteAllCity);
router.route("/attraction/:attractionName").get(findCityViaAttractionName);
router.route("/near/:lat/:lng/:dis").get(findNearCity);
router.route("/setCityData").post(setCityData);
router
  .route("/:cityName")
  .get(protect, restrictTo("admin", "user"), findCityBYName)
  .delete(deleteCityByName);
export { router };
