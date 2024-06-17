import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFlights: [],
  flightsByCountry: null,
  flightsByCity: [],
  flightRecomendation: null,
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
    setFlightsByCity: (state, action) => {
      state.flightsByCity = action.payload
    },
    setFlightRecomendation: (state, action) => {
      state.flightRecomendation = action.payload
    },
  },
})

export const { setFligthLists, setFlightsByCountry, setFlightsByCity, setFlightRecomendation } =
  flightLists.actions
export default flightLists.reducer
