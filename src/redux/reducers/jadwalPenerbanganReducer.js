// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  departureCity: 'Tempat Keberangkatan',
  arrivalCity: 'Tempat Tujuan',
  kotaKeberangkatan: '',
  kotaTujuan: '',
  tanggalBerangkatKembali: ['Tanggal Berangkat', 'Jadwal Kembali'],
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
    setTanggalBerangkatKembali: (state, action) => {
      state.tanggalBerangkatKembali = action.payload
    },
  },
})

export const {
  setDepartureCity,
  setArrivalCity,
  setKotaKeberangkatan,
  setKotaTujuan,
  setTanggalBerangkatKembali,
} = penerbanganSlice.actions

export default penerbanganSlice.reducer
