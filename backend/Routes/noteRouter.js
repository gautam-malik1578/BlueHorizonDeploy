import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createNote,
  deleteANote,
  deleteAllNotes,
  getAllNotes,
  getNoteonCityByaUser,
  getnotesbyUserId,
  updateAnote,
} from "../controllers/noteController.js";
const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin"), getAllNotes)
  .delete(protect, restrictTo("admin"), deleteAllNotes);
router.route("/me").get(protect, getnotesbyUserId);
router.route("/note/:noteId").delete(deleteANote).patch(updateAnote);
router
  .route("/city/:cityId/attraction/:attractionId")
  .post(protect, createNote)
  .get(protect, getNoteonCityByaUser);

export { router };
//protect is the route which makes or set the user obj on the req
