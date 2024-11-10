import express from "express";
import {
  // addLiketoAttraction,
  createAttraction,
  findPopularAttraction,
  findattractionByName,
  getAllAtractionsofACity,
  getAllAttraction,
  toggelLike,
  createMultipleAttractions,
} from "../controllers/attractionController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();

router.route("/").get(getAllAttraction).post(createAttraction);
router.route("/popular/:max").get(protect, findPopularAttraction);
router.route("/like/:attractionId").patch(protect, toggelLike);
router.route("/find/:attractionName").get(protect, findattractionByName);
router.route("/data/:cityId").post(createMultipleAttractions);
router
  .route("/city/:cityId")
  // .get(getAllAtractionsofACity)
  .get(protect, getAllAtractionsofACity)
  .post(createAttraction);
export { router };
