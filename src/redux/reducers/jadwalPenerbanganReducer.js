// reducers/otpReducers.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  departureCity: 'Bandara Keberangkatan',
  arrivalCity: 'Bandara Tujuan',
  kotaKeberangkatan: '',
  kotaTujuan: '',
  tanggalBerangkatKembali: ['Tanggal Berangkat', 'Jadwal Kembali'],
  jumlahPenumpang: {
    penumpangDewasa: 1,
    penumpangAnak: 0,
    penumpangBayi: 0,
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
    setKelasJadwalPenerbangan: (state, action) => {
      state.kelas = action.payload
    },
    setPenumpangDewasa: (state, action) => {
      state.jumlahPenumpang.penumpangDewasa = action.payload
    },
    setPenumpangAnak: (state, action) => {
      state.jumlahPenumpang.penumpangAnak = action.payload
    },
    setPenumpangBayi: (state, action) => {
      state.jumlahPenumpang.penumpangBayi = action.payload
    },
    setSeatClass: (state, action) => {
      state.kelas = action.payload
    },
  },
})

export const {
  setDepartureCity,
  setArrivalCity,
  setKotaKeberangkatan,
  setKotaTujuan,
  setTanggalBerangkatKembali,
  setKelasJadwalPenerbangan,
  setPenumpangAnak,
  setPenumpangBayi,
  setPenumpangDewasa,
  setSeatClass,
} = penerbanganSlice.actions

export default penerbanganSlice.reducer
