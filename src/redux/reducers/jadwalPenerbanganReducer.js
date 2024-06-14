// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  departureCity: 'Tempat Keberangkatan',
  arrivalCity: 'Tempat Tujuan',
  kotaKeberangkatan: '',
  kotaTujuan: '',
  tanggalKeberangkatan: null,
  tanggalKepulangan: null,
  jumlahPenumpang: {
    penumpangDewasa: null,
    penumpangAnak: null,
    penumpangBay: null,
  },
  kelas: null,
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
    setKotaKeberangkatan: (state, action) => {
      state.kotaKeberangkatan = action.payload
    },
    setKotaTujuan: (state, action) => {
      state.kotaTujuan = action.payload
    },
  },
})

export const { setDepartureCity, setArrivalCity, setKotaKeberangkatan, setKotaTujuan } =
  penerbanganSlice.actions

export default penerbanganSlice.reducer
