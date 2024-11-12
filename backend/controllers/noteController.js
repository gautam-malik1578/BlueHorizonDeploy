import Note from "../Models/notesModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createNote = catchAsync(async (req, res, next) => {
  const note = await Note.create({
    ...req.body,
    user: req.user.id,
    city: req.params.cityId,
    attraction: req.params.attractionId,
  });
  res.status(200).json({
    status: "success",
    data: { note },
  });
});
export const deleteAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.deleteMany({});
  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find({});
  const length = notes.length;
  res.status(200).json({
    status: "success",
    length,
    message: length ? "all notes reterived successfully" : "no notes found",
    data: {
      notes,
    },
  });
});
export const getnotesbyUserId = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ user: req.user.id });
  const length = notes.length;
  res.status(200).json({
    status: "success",
    length,
    message: length ? "all my notes reterived successfully" : "no notes found",
    data: {
      notes,
    },
  });
});
export const getNoteonCityByaUser = catchAsync(async (req, res, next) => {
  const note = await Note.find({
    user: req.user.id,
    city: req.params.cityId,
    attraction: req.params.attractionId,
  });
  const length = note.length;
  res.status(200).json({
    status: "success",
    length,
    message: length
      ? "the notes reterived successfully"
      : "no note found on the city by that user",
    data: {
      note,
    },
  });
});
export const deleteANote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.noteId);
  res.status(200).json({
    status: "success",
    message: "Note deleted successfully",
    data: null,
  });
});
export const updateAnote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    {
      content: req.body.content,
    },
    { new: true }
  );
  // console.log("the is the note we made ", note);
  res.status(200).json({
    status: "success",
    message: "note updated successfully",
    data: { note },
  });
});
