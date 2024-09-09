import express from "express";
import {
  findMyFavsAttraction,
  removeFav,
  setFav,
} from "../controllers/favoriteController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();
router.route("/myfavs").get(protect, findMyFavsAttraction);
router.route("/add/:attractionId").get(protect, setFav);
router.route("/remove/:attractionId").get(protect, removeFav);
export { router };
