import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: true,
  searchViaMap: false,
  showMap: false,
  StopshowAnnimation: true,
};
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    darkModeToogle(state, action) {
      state.isDarkMode = !state.isDarkMode;
    },
    ToogleShowAnnimation(state, action) {
      state.StopshowAnnimation = !state.StopshowAnnimation;
    },
    searchViaMapToogle(state, action) {
      // if (state.searchViaMap == false) {
      //   state.showMap = true;
      //   state.searchViaMap = true;
      //   //when we start search via map we also want the map to appear
      // } else {
      //   state.showMap = false;
      //   state.searchViaMap = false;
      // }
      if (!state.searchViaMap) {
        state.showMap = true;
        state.searchViaMap = true;
        state.searchType = "map"; // Only set to "map" when actively toggling to the map search
      } else {
        state.showMap = false;
        state.searchViaMap = false;
        state.searchType = "country"; // Reset to "country" when toggling off
      }
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
  ToogleShowAnnimation,
} = settingSlice.actions;
const settingReducer = settingSlice.reducer;
export default settingReducer;
