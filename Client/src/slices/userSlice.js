import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  userId: null,
  username: "",
  token: "",
  gender: "",
  userLat: "",
  userLng: "",
};
const userSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLogIn(state, action) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserData(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.gender = action.payload.gender;
    },
    setUserCoords(state, action) {
      state.userLat = action.lat;
      state.userLng = action.lng;
    },
  },
});
export const { toggleLogIn, setToken, setUserData, setUserCoords } =
  userSilce.actions;
const userReducer = userSilce.reducer;
export default userReducer;
