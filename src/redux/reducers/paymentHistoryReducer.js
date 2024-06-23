// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  paymentHistory: [],
}

const paymentHistorySlice = createSlice({
  name: 'paymentHistory',
  initialState,
  reducers: {
    setPaymentHistory: (state, action) => {
      state.paymentHistory = action.payload
    },
  },
})

export const { setPaymentHistory } = paymentHistorySlice.actions

export default paymentHistorySlice.reducer
