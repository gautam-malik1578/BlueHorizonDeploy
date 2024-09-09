import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 2,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    index: true,
  },
  attraction: {
    type: mongoose.Schema.ObjectId,
    ref: "Attraction",
    index: true,
  },
  cityName: {
    type: String,
  },
});

const Note = mongoose.model("Note", notesSchema);
export default Note;
