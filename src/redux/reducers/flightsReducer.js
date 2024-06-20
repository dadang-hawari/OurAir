import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFlights: [],
  flightsByCountry: null,
  flightsByCity: [],
  flightRecomendation: null,
  flightDetail: null,
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
    setFlightDetail:(state, action) => {
      state.flightDetail= action.payload
    }
  },
})

export const { setFligthLists, setFlightsByCountry, setFlightsByCity, setFlightRecomendation,setFlightDetail } =
  flightLists.actions
export default flightLists.reducer
