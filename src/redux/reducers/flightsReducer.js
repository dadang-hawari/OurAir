import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFlights: [],
  flightsByCountry: null,
}

const flightLists = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFligthLists: (state, action) => {
      state.allFlights = action.payload
    },
    setFlightsByCountry: (state, action) => {
      state.flightsByCountry = action.payload
    },
  },
})

export const { setFligthLists, setFlightsByCountry } = flightLists.actions
export default flightLists.reducer
