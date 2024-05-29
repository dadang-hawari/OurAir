import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timerOtp: 60,
  email: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
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
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setTimerOtp, decrementTimerOtp, resetTimerOtp, setEmail } = otpSlice.actions;

export default otpSlice.reducer;
