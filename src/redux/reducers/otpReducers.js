// reducers/otpReducers.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timerOtp: 10,
  email: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    decrementTimerOtp: (state) => {
      state.timerOtp -= 1;
    },
    resetTimerOtp: (state, action) => {
      state.timerOtp = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { decrementTimerOtp, resetTimerOtp, setEmail } = otpSlice.actions;

export default otpSlice.reducer;
