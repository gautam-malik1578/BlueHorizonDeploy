import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: true,
  searchViaMap: false,
  showMap: false,
};
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    darkModeToogle(state, action) {
      state.isDarkMode = !state.isDarkMode;
    },
    searchViaMapToogle(state, action) {
      if (state.searchViaMap == false) {
        state.showMap = true;
        state.searchViaMap = true;
        //when we start search via map we also want the map to appear
      } else {
        state.showMap = false;
        state.searchViaMap = false;
      }
      // state.searchViaMap = !state.searchViaMap;
      // console.log(
      //   "the value of the searchVia map and showMap are ---",
      //   state.searchViaMap,
      //   state.showMap
      // );
    },
    setMapFalse(state, action) {
      state.searchViaMap = false;
      state.showMap = false;
    },
    showMapToggle(state, action) {
      // if (state.showMap && !state.searchViaMap) {
      //   state.searchViaMap = false;
      //   //when we stop the map then we want   search via map to also stop
      // }
      // // {
      // //   // state.searchViaMap = true;
      // // }
      // state.showMap = !state.showMap;
      if (state.showMap == false) {
        state.showMap = true;
        state.searchViaMap = true;
        //when we start search via map we also want the map to appear
      } else {
        state.showMap = false;
        state.searchViaMap = false;
      }
    },
  },
});
export const {
  darkModeToogle,
  searchViaMapToogle,
  showMapToggle,
  setMapFalse,
} = settingSlice.actions;
const settingReducer = settingSlice.reducer;
export default settingReducer;
