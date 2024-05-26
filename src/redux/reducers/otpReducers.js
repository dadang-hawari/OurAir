import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    timerOtp: 60,
  },
  reducers: {
    setTimerOtp: (state, action) => {
      state.timerOtp = action.payload;
    },
    decrementTimerOtp: (state) => {
      state.timerOtp -= 1;
    },
    resetTimerOtp: (state, action) => {
      state.timerOtp = action.payload;
    },
  },
});

export const { setTimerOtp, decrementTimerOtp, resetTimerOtp } = otpSlice.actions;

export default otpSlice.reducer;
