// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  paymentHistory: [],
  waitingTransaction: null,
}

const paymentHistorySlice = createSlice({
  name: 'paymentHistory',
  initialState,
  reducers: {
    setPaymentHistory: (state, action) => {
      state.paymentHistory = action.payload
    },
    setWaitingTransaction: (state, action) => {
      state.waitingTransaction = action.payload
    },
  },
})

export const { setPaymentHistory, setWaitingTransaction } = paymentHistorySlice.actions

export default paymentHistorySlice.reducer
