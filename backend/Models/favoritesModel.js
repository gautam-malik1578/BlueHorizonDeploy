import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  attractionIds: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Attraction" }],
  },
  // cityIds: {
  //   type: [{ type: mongoose.Schema.ObjectId, ref: "City" }],
  // },
});
favSchema.statics.checkIsFav = async function (userId, favId) {
  // this is where the logice is required
  const result = await this.find({
    user: userId,
    attractionIds: {
      $in: favId,
    },
  });
  // console.log("the results from 1999919919919 is ", result);
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};
// favSchema.virtual("isLiked").get(async function () {});
const Favorite = mongoose.model("Favorite", favSchema);
export default Favorite;
