import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFlights: [],
  flightsByCountry: null,
  flightsByCity: [],
  flightRecomendation: null,
  flightDetail: null,
  flightSeats: [],
  isLoading: false,
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
    setFlightDetail: (state, action) => {
      state.flightDetail = action.payload
    },
    setFlightSeats: (state, action) => {
      state.flightSeats = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setFlightSeats, setFligthLists, setFlightsByCountry, setFlightsByCity, setIsLoading, setFlightRecomendation, setFlightDetail } = flightLists.actions
export default flightLists.reducer
