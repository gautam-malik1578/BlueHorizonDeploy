import mongoose from "mongoose";
const attractionSchema = new mongoose.Schema({
  attractionName: {
    type: String,
    requied: true,
  },
  description: {
    type: String,
    requied: true,
  },
  tags: {
    type: [String],
    validate: [
      (arr) => arr.length > 0,
      "there must be on tag for the attraction",
    ],
  },
  cityId: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
  },
  cityName: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  imgs: {
    type: [String],
    validate: [
      (arr) => arr.length > 0,
      "there must be on tag for the attraction",
    ],
  },
  // askedBy: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   requied: true,
  // },
  isFav: {
    type: Boolean,
  },
  isLiked: {
    type: Boolean,
  },
});
// attractionSchema.virtual("isFav").get(async function () {});
attractionSchema.set("toObject", { virtuals: true });
const Attraction = mongoose.model("Attraction", attractionSchema);
export default Attraction;
