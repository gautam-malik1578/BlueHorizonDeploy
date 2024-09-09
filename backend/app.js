//////////////////////////// 3rd part lib///////////////////////////////////
import express from "express";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
/////////////////////////////////built in ///////////////////////////////////

/////////////////////////////////other files/////////////////////////////////
// import userRouter from "./Routes/userRouter";
import { Router as userRouter } from "./Routes/userRouter.js";
import { router as cityRouter } from "./Routes/cityRouter.js";
import { router as reviewRouter } from "./Routes/reviewRouter.js";
import { router as notesRouter } from "./Routes/noteRouter.js";
import { router as attractionRouter } from "./Routes/attractionRouter.js";
import { router as favoriteRouter } from "./Routes/favoriteRouter.js";
import { router as likeRouter } from "./Routes/likesRouter.js";
import { router as replyRouter } from "./Routes/repliesRouter.js";
import { GlobalErrorHandler } from "./utils/GlobalErrorHandler.js";

//////////connecting to the db//////////////////////////////////////
mongoose
  .connect(
    // "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2",
    "mongodb://127.0.0.1:27017/blueHorizon",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true, //caferful about  to be deprecateed
      serverSelectionTimeoutMS: 2000,
      appName: "mongosh 2.0.2",
    }
  )
  .then((res) => {
    // console.log(res); //full of data//
    console.log("boi connected to the db---->>>> 😎😎😎");
  })
  .catch((err) => {
    console.log("there was an error connectiong to db 💥💥💥💥", err);
  });

////////////////////middlerwares//////////////////////////////
// const corsOptions = {
//   origin: "http://localhost:5173/travel",
//   Credential: true,
// };
const App = express();
// App.use(cookieParser());
App.use(
  cors({
    // origin: "http://127.0.0.1:5173/",
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
App.use(express.json()); ///adding the middleware to the stack to read the body
// const myfile = fs.readFileSync("./text.txt", "utf-8");
// fs.writeFileSync("./test.txt", myfile);
App.use(cookieParser());
App.use(morgan("dev"));
App.get("/", (req, res) => {
  res.status(400).json({
    status: "success",
    data: "hello from the server",
  });
});
App.use(compression());
App.use("/user", userRouter);
App.use("/cities", cityRouter);
App.use("/reviews", reviewRouter);
App.use("/notes", notesRouter);
App.use("/attractions", attractionRouter);
App.use("/favorites", favoriteRouter);
App.use("/likes", likeRouter);
App.use("/replies", replyRouter);
App.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "we could not find the route",
  });
});

App.use(GlobalErrorHandler);

App.listen(8000, () => {
  console.log("hey we are listining on the 8000 port:))))))");
});
// console.log(
//   "this is to check the dotenv file 😁😁😁😁😁😁😁",
//   process.env.NAME
// );

export default App;
