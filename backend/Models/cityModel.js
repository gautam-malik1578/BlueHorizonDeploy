import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    unique: true,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
  },

  todos: [String],
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
});
citySchema.statics.addAttractionToCity = async function (
  cityId,
  attractionName
) {
  const city = await this.findByIdAndUpdate(cityId, {
    $addToSet: { todos: attractionName },
  });
  console.log("☁️☁️☁️☁️", city, cityId);
};
citySchema.index({ location: "2dsphere" });
const City = mongoose.model("City", citySchema);
City.createIndexes();
// City.collection.dropIndexes();
export default City;
