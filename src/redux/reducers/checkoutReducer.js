import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  idFlight: null,
  useCurrentEmail: false,
  selectedSeats: [],
  penumpang: [],
  jumlahPenumpang: null,
  pemesan: {
    data: {
      namaLengkapPemesan: '',
      namaKeluargaPemesan: '',
      nomorTeleponPemesan: '',
      emailPemesan: '',
    },
  },
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setPemesan: (state, action) => {
      const { name, value } = action.payload
      state.pemesan.data[name] = value
    },
    setPenumpang: (state, action) => {
      state.penumpang = action.payload
      console.log('penupmang', action)
    },
    setJumlahPenumpang: (state, action) => {
      state.jumlahPenumpang = action.payload
    },
    setUseCurrentEmail: (state, action) => {
      state.useCurrentEmail = action.payload
    },
    updatePenumpang: (state, action) => {
      const { id, name, value } = action.payload
      const penumpangIndex = state.penumpang.findIndex((p) => p.id === id)
      if (penumpangIndex >= 0) {
        state.penumpang[penumpangIndex][name] = value
      }
    },
    updateTanggalLahir: (state, action) => {
      const { id, date } = action.payload
      const penumpangIndex = state.penumpang.findIndex((p) => p.id === id)
      if (penumpangIndex >= 0) {
        state.penumpang[penumpangIndex].tanggalLahir = date
      }
    },
    updateBerlakuSampai: (state, action) => {
      const { id, date } = action.payload
      const penumpangIndex = state.penumpang.findIndex((p) => p.id === id)
      if (penumpangIndex >= 0) {
        state.penumpang[penumpangIndex].berlakuSampai = date
      }
    },
    // setSelectedSeatPenumpang: (state, action) => {
    //   const { id } = action.payload
    //   const penumpangIndex = state.penumpang.findIndex((p) => p.id === id)
    //   console.log('action selected seat', action)
    // },
    setIdFlight: (state, action) => {
      state.idFlight = action.payload
    },
    setSelectedSeat: (state, action) => {
      state.selectedSeats = [action.payload]
    },
    addSelectedSeat: (state, action) => {
      state.selectedSeats.push(action.payload)
    },
    removeSelectedSeat: (state, action) => {
      state.selectedSeats = state.selectedSeats.filter((id) => id !== action.payload)
    },
    resetSelectedSeats: (state) => {
      state.selectedSeats = []
    },
  },
})

export const {
  setPemesan,
  setPenumpang,
  setUseCurrentEmail,
  setIdFlight,
  updateBerlakuSampai,
  updatePenumpang,
  updateTanggalLahir,
  setSelectedSeat,
  addSelectedSeat,
  removeSelectedSeat,
  resetSelectedSeats,
  setJumlahPenumpang,
} = checkoutSlice.actions
export default checkoutSlice.reducer
