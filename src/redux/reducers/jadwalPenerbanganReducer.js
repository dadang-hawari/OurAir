// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  departureCity: 'Tempat Keberangkatan',
  arrivalCity: 'Tempat Tujuan',
}

const penerbanganSlice = createSlice({
  name: 'jadwal-penerbangan',
  initialState,
  reducers: {
    setDepartureCity: (state, action) => {
      state.departureCity = action.payload
    },
    setArrivalCity: (state, action) => {
      state.arrivalCity = action.payload
    },
  },
})

export const { setDepartureCity, setArrivalCity } = penerbanganSlice.actions

export default penerbanganSlice.reducer
