import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  idFlight: null,
  useCurrentEmail: false,
  selectedSeats: [],
  penumpang: [],
  jumlahPenumpang: null,
  pemesan: {
    data: {
      fullname: '',
      surname: '',
      phone_number: '',
      email: '',
    },
  },
  transaction: null,
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transaction = action.payload
    },
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
        state.penumpang[penumpangIndex].birth_date = date
      }
    },
    updateBerlakuSampai: (state, action) => {
      const { id, date } = action.payload
      const penumpangIndex = state.penumpang.findIndex((p) => p.id === id)
      if (penumpangIndex >= 0) {
        state.penumpang[penumpangIndex].document_expired = date
      }
    },
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
    assignSeatsToPassengers: (state, action) => {
      const seats = action.payload
      state.penumpang = state.penumpang.map((penumpang, index) => ({
        ...penumpang,
        seat_number: seats[index] || '',
      }))
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
  assignSeatsToPassengers,
  setTransaction,
} = checkoutSlice.actions
export default checkoutSlice.reducer
