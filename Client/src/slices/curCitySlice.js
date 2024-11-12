import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityId: "",
  lat: "",
  lng: "",
  name: "",
  country: "",
  isLoading: false,
  isError: false,
};
const curCitySlice = createSlice({
  name: "curCity",
  initialState,
  reducers: {
    cityClicked(state, action) {
      // console.log(action.payload);
      state.cityId = action.payload.cityId;
      state.name = action.payload.name;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});
const curCityReducer = curCitySlice.reducer;
export const { cityClicked } = curCitySlice.actions;
export default curCityReducer;
