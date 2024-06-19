import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dataPemesan: null,
  dataPenumpang: null,
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setDataPemesan: (state, action) => {
      state.dataPemesan = action.payload
    },
    setDataPenumpang: (state, action) => {
      state.dataPenumpang = action.payload
    },
  },
})

export const { setDataPemesan, setDataPenumpang } = checkoutSlice.actions
export default checkoutSlice.reducer
