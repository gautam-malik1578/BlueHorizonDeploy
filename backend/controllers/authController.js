import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../Models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/Error.js";

// function getRandomInt(min, max) { // this is valid mate and will be helpful mate
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Example: Random integer between 1 and 100
// console.log(getRandomInt(1, 100)); // Example output: 42

//
// as we create a user the user account will be created but he has to verfiy in order to keep his account within 15 min of the otp send to login in and do other stuff else the user shall ask for otp again and get verified then only token shall be sent
//
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
export const Verify = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.otp) {
    return next(new AppError("plz provide both and email and otp ", 400));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("the email does not exist  ", 400));
  }
  if (user.isVerified) {
    return next(new AppError("the user is already verified ", 400));
  }
  // now we need to check if the otp sent is matches to what we gave and is within the time limit and respond accordingly
  if (user.Otp != Number(req.body.otp)) {
    return next(new AppError("the otp did not match", 401));
  }
  if (user.otpVaildTime < Date.now()) {
    return next(new AppError("the otp is no longer valid plz ask for new otp"));
  }
  //  by now we have all the condition ready and valid  now we need to have send the token
  // so send make the user verified and send the token to the user mate
  user.isVerified = true;
  await user.save({ validateBeforeSave: false }); //this guy should be saved to the data base mate

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
  // boi this one was a long one nah mate
});

export const sendOtp = catchAsync(async (req, res, next) => {
  // now this guy need to be here mate it should have the email to whic we need to send otp and to that email we set the
  if (!req.body.email) {
    return next(new AppError("plz provide the eamil which is to be verified"));
  }
  // now what we can  find the user wiht the desired email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("the email does not exist ", 400));
  }
  if (user.isVerified) {
    return next(new AppError("the user is already verified ", 400));
  }
  // now if we have reached  here we need to genrate the otp save it to db and the expired time and the send it over via email
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // we have genrate the otp
  user.Otp = otp;
  user.otpVaildTime = Date.now() + 15 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  // by now we have written to the the database all we need now is to sent it over to the user on his mail
  // Set up Nodemailer transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or any other email service
    auth: {
      user: process.env.EMAIL_USERNAME, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password or app-specific password
    },
  });
  ///

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // sender address
    to: user.email, // receiver's email
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
  // by now we have sent the otp to the user to his mail just now respond to the request
  res.status(200).json({
    status: "success",
    message: `an otp has been sent to ${user.email} ,vaild for 15 min`,
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
  if (user.isVerified == false) {
    // make sure that the user is verified then only
    return next(
      new AppError("the user is not verifed plz verfiy with an otp", 401)
    );
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
  // console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", req.query);
  // console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", req.cookies.jwt);
  // console.log("😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎", req.headers);
  //check if token was given or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log(req.headers.authorization);
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

    // console.log(
    //   "we in protect route------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    //   decode
    // );
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
