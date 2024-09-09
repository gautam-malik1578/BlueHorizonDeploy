import express from "express";
import { getAllAttractionsLikedByMe } from "../controllers/likesController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();
router.route("/me").get(protect, getAllAttractionsLikedByMe);
export { router };
