import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  idFlight: null,
useCurrentEmail: false,
flightDetail:null,

  penumpang: [],
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
      const { name, value } = action.payload;
      state.pemesan.data[name] = value;
    },
    setPenumpang: (state, action) => {
      state.penumpang = action.payload
      console.log('penupmang', action)
    },
    setUseCurrentEmail: (state, action) => {
      state.useCurrentEmail = action.payload
    },
    updatePenumpang: (state, action) => {
      const { id, name, value } = action.payload;
      const penumpangIndex = state.penumpang.findIndex(p => p.id === id);
      if (penumpangIndex >= 0) {
        state.penumpang[penumpangIndex][name] = value;
      }
    },
    updateTanggalLahir: (state, action) => {
      const { id, date } = action.payload;
      const penumpangIndex = state.penumpang.findIndex(p => p.id === id);
      if (penumpangIndex >= 0) {
        state.penumpang[penumpangIndex].tanggalLahir = date;
      }
    },
    updateBerlakuSampai: (state, action) => {
      const { id, date } = action.payload;
      const penumpangIndex = state.penumpang.findIndex(p => p.id === id);
      if (penumpangIndex >= 0) {
        state.penumpang[penumpangIndex].berlakuSampai = date;
      }
    },
    setIdFlight: (state, action) => {
      state.idFlight = action.payload
    },
    setFlightDetail:(state, action) => {
      state.flightDetail= action.payload
    }
  },
})

export const { setPemesan, setPenumpang, setUseCurrentEmail, setIdFlight, updateBerlakuSampai, updatePenumpang, updateTanggalLahir, setFlightDetail } = checkoutSlice.actions
export default checkoutSlice.reducer
