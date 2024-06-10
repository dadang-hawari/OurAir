import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFlights: null,
}

const flightLists = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFligthLists: (state, action) => {
      state.allFlights = action.payload
    },
  },
})

export const { setFligthLists } = flightLists.actions
export default flightLists.reducer
