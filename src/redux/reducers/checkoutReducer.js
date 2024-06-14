import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dataPemesan: null,
  dataPenumpang: null,
}

const primaryLogin = createSlice({
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

export const { setDataPemesan, setDataPenumpang } = primaryLogin.actions
export default primaryLogin.reducer
