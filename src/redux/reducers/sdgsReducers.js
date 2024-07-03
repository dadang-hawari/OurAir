import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalDonation: null,
}

const sdgsSlice = createSlice({
  name: 'sdgs',
  initialState,
  reducers: {
    setTotalDonation: (state, action) => {
      state.totalDonation = action.payload
    },
  },
})

export const { setTotalDonation } = sdgsSlice.actions
export default sdgsSlice.reducer
