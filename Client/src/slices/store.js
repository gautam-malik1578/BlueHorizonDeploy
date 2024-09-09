import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingSlice";
import curCityReducer from "./curCitySlice";
import userReducer from "./userSlice";
import seacrhReducer from "./searchSlice";
import { draftReducer } from "./draftSlice";
const store = configureStore({
  reducer: {
    setting: settingReducer,
    curCity: curCityReducer,
    user: userReducer,
    search: seacrhReducer,
    draft: draftReducer,
  },
});
export default store;
