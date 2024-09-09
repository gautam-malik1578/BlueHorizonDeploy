import Reply from "../Models/repliesModel.js";
import Review from "../Models/reviewModel.js";
import { AppError } from "../utils/Error.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllReplies = catchAsync(async (req, res, next) => {
  const replies = await Reply.find();
  const length = replies.length;
  res.status(200).json({
    status: "success",
    length,
    data: { replies },
  });
});
export const deleteAllReplies = catchAsync(async (rew, res, next) => {
  const replies = await Reply.deleteMany({});
  const length = replies.length;
  res.status(200).json({
    status: "success",
    message: "all replies have been deleted",
    length,
    data: { replies },
  });
});

export const getAllrepliesOnAReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return next(new AppError("the review has been deleted :(", 400));
  }
  const replies = await Reply.find({ reviewId: req.params.reviewId });
  const length = replies.length;
  res.status(200).json({
    status: "success",
    length,
    data: { replies },
  });
});

export const deleteAllrepliesOnAReview = catchAsync(async (req, res, next) => {
  const replies = await Reply.deleteMany({ reviewId: req.params.reviewId });
  const length = replies.length;
  res.status(200).json({
    status: "success",
    length,
    data: { replies },
  });
});

//when to set username and to what value ,ans-what is the need of the username at first place
export const createAReplyOnAReview = catchAsync(async (req, res, next) => {
  const reply = await Reply.create({
    reviewId: req.params.reviewId,
    userId: req.user.id,
    username: req.user.username,
    ...req.body,
  });
  res.status(200).json({
    status: "success",
    data: { reply },
  });
});
// the below code could be made redundant so keep an eye on that /////////
export const createAReplyOnAReply = catchAsync(async (req, res, next) => {
  const reply = await Reply.create({
    reviewId: req.params.reviewId,
    userId: req.user.id,
    username: req.user.username,
    ...req.body,
  });
  res.status(200).json({
    status: "success",
    data: { reply },
  });
});
/////////////////////may be redundant ^^^^^^^^  ///////////////////////////
export const deleteAReply = catchAsync(async (req, res, next) => {
  const reply = await Reply.findOneAndDelete({
    _id: req.params.replyId,
    userId: req.user.id,
  });
  if (!reply) {
    console.log(
      "immmmmmmmmmmmmmmmmmmmmmmmmmmppppppppppppppppppppppppppp))))))))))))))))",
      reply,
      req.user.id
    );
    return next(
      new AppError("only the user who made the reply can delete it", 400)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      reply,
    },
  });
});
export const updateAReply = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return next(new AppError("the review has been deleted :(", 400));
  }
  const reply = await Reply.findOneAndUpdate(
    {
      _id: req.params.replyId,
      userId: req.user.id,
    },
    { content: req.body.content, isUpdated: true },
    { new: true }
  );
  if (!reply) {
    console.log(reply);
    return next(new AppError("you can't update this review", 200));
  }
  res.status(200).json({
    status: "success",
    data: { reply },
  });
});
