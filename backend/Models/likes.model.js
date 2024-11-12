import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  attractionsIds: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Attraction" }],
  },
});
likesSchema.statics.addToLike = async function (id, attractionId) {
  //here what i want is to check if attractinId is in attractionsIds if yes remove it and the return ture else add it and return fasle also  make sure if the doc exisit by that id  if not create the doc and add the attractionId
  const exisitdoc = await this.findOne({
    user: id,
    attractionsIds: attractionId,
  });
  // console.log("💥💥💥💥💥💥💥💥💥💥💥💥1", exisitdoc);
  if (exisitdoc) {
    const doc = await this.findOneAndUpdate(
      { user: id },
      { $pull: { attractionsIds: attractionId } },
      {
        new: true,
      }
    );
    // console.log(
    //   "removed the like on the attraction--->>> returen false😢😢😢",
    //   doc
    // );
    return false;
  } else {
    const doc = await this.findOneAndUpdate(
      { user: id },
      { $addToSet: { attractionsIds: attractionId } },
      { new: true, upsert: true }
    );
    // console.log(
    //   "added the  like on the attraction ----->>>> returend true 😁😁😁",
    //   doc
    // );
    return true;
  }
};
const Like = mongoose.model("Like", likesSchema);
export default Like;
