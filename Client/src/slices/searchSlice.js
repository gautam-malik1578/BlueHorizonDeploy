import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchType: "country",
  searchValue: "",
  mapCenterLat: "",
  mapCenterLng: "",
  mapCenterRadius: 1000,
  previousSearchType: "",
  previousSearchValue: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search(state, action) {
      state.searchType = action.payload.searchType;
      state.searchValue = action.payload.searchValue;
    },
    setMapCenterCoords(state, action) {
      state.mapCenterLat = action.payload.lat;
      state.mapCenterLng = action.payload.lng;
    },
    setMapCenterRadius(state, action) {
      state.mapCenterRadius = action.payload;
    },
    setPreviousSearch(state, action) {
      state.previousSearchType = action.payload.previousSearchType;
      state.previousSearchValue = action.payload.previousSearchValue;
    },
  },
});
export const { search, setMapCenterCoords, setMapCenterRadius } =
  searchSlice.actions;
const seacrhReducer = searchSlice.reducer;
export default seacrhReducer;
