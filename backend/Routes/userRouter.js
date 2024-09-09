import express from "express";

import {
  changeAvatar,
  createUser,
  deleteAUser,
  findMe,
  getAllUsers,
} from "../controllers/userController.js";
import {
  login,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController.js";
const Router = express.Router();
Router.route("/").get(getAllUsers).post(createUser);

Router.route("/signup").post(signUp);
Router.route("/login").post(login);
Router.route("/resetpassword").post(protect, resetPassword);
Router.route("/me").get(protect, findMe);
Router.route("/avatar").patch(protect, changeAvatar);
Router.route("/:userId").delete(deleteAUser);

export { Router };
