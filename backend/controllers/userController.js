import User from "../Models/userModel.js";
import Review from "../Models/reviewModel.js";
import { AppError } from "../utils/Error.js";
import { catchAsync } from "../utils/catchAsync.js";
const avatarToUrls = {
  default:
    "https://st2.depositphotos.com/1069290/44761/v/450/depositphotos_447612982-stock-illustration-cute-young-man-avatar-character.jpg",
  shinchan:
    "https://sdl-stickershop.line.naver.jp/products/0/0/4/1718/android/stickers/32883.png;compress=true",
  naruto:
    "https://cdn.pixabay.com/photo/2023/09/04/03/24/ai-generated-8231889_640.png",
  kirmada:
    "https://cdnb.artstation.com/p/assets/images/images/063/961/135/large/zain-latif-kirmada.jpg?1686767075",
  goku: "https://www.colorwallpapers.com/uploads/wallpaper/goku-normal-form/width-853/QFPyX2eQSXbK-dragon-render-goku-normal-anime-png-form.png",
  winry:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTE7yNy-bvMVfchlUiYXTDT0k6I9FzAFkMcNlw5gYGdg&s",
  pikachu:
    "https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg",
  po: "https://w0.peakpx.com/wallpaper/887/334/HD-wallpaper-movie-kung-fu-panda-po-kung-fu-panda-thumbnail.jpg",
  saturu: "https://dk2dv4ezy246u.cloudfront.net/widgets/sSFOv3Q1YSTl_large.jpg",
  sakura:
    "https://www.drawing123.com/wp-content/uploads/2022/11/Drawing-Sakura-Step-11.jpg",
};
function matchAvatarToUrl(avatar) {
  return avatarToUrls[avatar];
}

export const createUser = catchAsync(async (req, res, next) => {
  //   console.log("the req body is =====>", req.body);

  const user = await User.create({ ...req.body, role: "user" });
  //   if (!user) {
  //     return next(new AppError("error in making the user ", 203));
  //   }
  res.status(200).json({
    status: "success",
    user,
  });
});
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  const length = users.length;
  res.status(200).json({
    status: "success",
    length,
    users,
  });
});
export const deleteAUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({
    status: "success",
    message: "the user account has been deleted",
  });
});
export const findMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select(
    "-password -cnfPassword -passwordCreatedAt"
  );

  res.status(200).json({ status: "success", data: { user } });
});
export const changeAvatar = catchAsync(async (req, res, next) => {
  const avatarUrl = matchAvatarToUrl(req.body.avatar);
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      avatar: req.body.avatar,
      avatarUrl,
    },
    { new: true }
  );
  if (!user) {
    return next(new AppError("can't update the avatar as user not found", 400));
  }
  const newUrl = matchAvatarToUrl(req.body.avatar);
  await Review.updateAvatar(req.user.id, req.body.avatar, newUrl);
  if (!user) {
    return next(new AppError("can't update the avatar", 400));
  }
  res.status(200).json({
    status: "sucess",
    msg: "avatr changed sucessfully",
    user,
  });
});
