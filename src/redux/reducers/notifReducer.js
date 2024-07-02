// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: [],
  prevPage: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    setPrevPage: (state, action) => {
      state.prevPage = action.payload
    },
  },
})

export const { setNotification, setPrevPage } = notificationSlice.actions

export default notificationSlice.reducer
