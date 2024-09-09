import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../Models/userModel.js";
import { AppError } from "../utils/Error.js";

export const signUp = catchAsync(async (req, res, next) => {
  //create the user
  const user = await User.create({ ...req.body, role: "user" });

  // make  a token of its id and not password as it will be unique and useful in the future
  const token = jwt.sign({ id: user.id }, process.env.MYSECRETSTRING, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, //so that js in browser can not access it
    secure: process.env.ENVIORMENT === "production", //if true then only sent on https
  });
  //send the response to the user
  res.status(200).json({
    status: "success",
    token,
    userId: user.id,
    username: user.username,
    gender: user.sex,
  });
});

export const login = catchAsync(async (req, res, next) => {
  //0)check both email and password are provoided
  if (!req.body.email || !req.body.password) {
    next(new AppError("plz provide a email and a password to login", 404));
  }
  //1)check if the user via given email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("the user or password did not match", 401));
  }
  //2)check if the password matches the hashed password in the db
  const passwordMatched = await user.isPassWordTrue(
    req.body.password,
    user.password
  );
  if (!passwordMatched) {
    return next(new AppError("the password or user did not match", 401));
  }

  //3)mount the user info on the req obj+give the token
  const token = jwt.sign({ id: user.id }, process.env.MYSECRETSTRING, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 2,
    httpOnly: true, //so that js in browser can not access it
    // secure: process.env.ENVIORMENT === "production", //if true then only sent on https
    secure: false, //if true then only sent on https
    sameSite: "none",
    domain: "localhost",
    hostOnly: false,
    path: "/",
  });
  req.user = user;
  //4)send the response to the user
  res.status(200).json({
    status: "success",
    token,
    userId: user.id,
    username: user.username,
    gender: user.sex,
  });
});
export const protect = catchAsync(async (req, res, next) => {
  let token;
  console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", req.query);
  console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", req.cookies.jwt);
  console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", req.headers);
  //check if token was given or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(req.headers.authorization);
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.query.token) {
    token = req.query.token;
  } else {
    return next(new AppError("plz  login  to gain access", 401));
  }
  //check if the token is ours or not verfiy
  let decode;
  try {
    decode = jwt.verify(token, process.env.MYSECRETSTRING, {
      complete: false,
    });

    console.log(
      "we in protect route------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      decode
    );
  } catch (err) {
    // return res.status(500).json({ status: "fail", err });
    if (err.message === "jwt expired") {
      return next(new AppError("token expired plz login in again", 400));
    } else {
      return next(new AppError(err, 500));
    }
  }
  //will get id as payload if ours then with that to check if user still exist
  const user = await User.findById(decode?.id);
  if (!user) {
    return next(new AppError("the user no loger exists", 400));
  }
  //check the password has been reset after the token was issued
  if (!user.isTokenValid(decode?.iat, decode?.exp)) {
    return next(new AppError("the password was changed  plz login again", 400));
  }
  req.user = user;
  next();
});

export const restrictTo = function (...allowed) {
  // allowed.includes()
  return (req, res, next) => {
    if (!allowed.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
export const resetPassword = catchAsync(async (req, res, next) => {
  //1)check if all three things are provided in one way or another
  if (!req.user || !req.body.newPassword) {
    return next(
      new AppError(
        "plz provide a new password after login in order to change the password",
        401
      )
    );
  }
  if (req.user.password === req.body.newPassword) {
    return next(
      new AppError("plz give a new password to reset the old one", 401)
    );
  }
  //2)check that the password matches the password in db of the given email (skip)

  //3)reset the password and send the token as well to keep user logged in
  //   const user = await User.findByIdAndUpdate(req.user.id, {
  //     password: req.body.newPassword,
  //   });
  const user = await User.findById(req.user.id);
  user.password = req.body.newPassword;
  await user.save({ validateBeforeSave: false }); //need to await for sure
  const token = createAndSendToken(user.id, "1d", res);
  req.user = user;
  res.status(200).json({
    status: "success",
    message: "password changed successfully",
    user,
    token,
  });
});
const createAndSendToken = (tokenPayload, timetoexpire, res) => {
  const token = jwt.sign({ id: tokenPayload }, process.env.MYSECRETSTRING, {
    expiresIn: timetoexpire,
  });
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, //so that js in browser can not access it
    secure: process.env.ENVIORMENT === "production", //if true then only sent on https
  });
  return token;
};
