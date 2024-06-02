// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timerOtp: 60,
  email: null,
  otpSentTime: null, // Tambahkan ini untuk menyimpan waktu pengiriman OTP
}

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setOtpSentTime: (state, action) => {
      state.otpSentTime = action.payload
    },
    decrementTimerOtp: (state) => {
      state.timerOtp -= 1
    },
    resetTimerOtp: (state, action) => {
      state.timerOtp = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
  },
})

export const { setOtpSentTime, decrementTimerOtp, resetTimerOtp, setEmail } =
  otpSlice.actions

export default otpSlice.reducer
