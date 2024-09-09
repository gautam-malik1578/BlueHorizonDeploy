import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reviews: [
    {
      userId: "",
      attractionId: "",
      cityID: "",
      content: "",
    },
  ],
};
const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    addReview(state, action) {
      state.reviews.push(action.payload);
    },
    removeReview(state, action) {},
  },
});
const draftReducer = draftSlice.reducer;
export { draftReducer };
export const { addReview, removeReview } = draftSlice.actions;
