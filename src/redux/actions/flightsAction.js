import axios from 'axios'
import { toast } from 'react-toastify'
import {
  setFligthLists,
  setFlightsByCity,
  setFlightRecomendation,
} from '../reducers/flightsReducer'

export const getAllFlights = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_DOMAIN_API
      }/api/v1/flights/search-or-fetch-all-flight-from?page=1&limit=9999`
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setFligthLists(data))
    }
    // console.log('response login :>> ', data)
  } catch (error) {
    console.error('error', error)
  }
}

export const getFlightByCityorCountry =
  (fromairport, toairport, kelas, startDate, endDate) => async (dispatch) => {
    try {
      console.log('kelas :>> ', kelas)
      console.log('to :>> ', endDate)
      const response = await axios.get(
        `${
          import.meta.env.VITE_DOMAIN_API_DEV
        }/api/v1/flights/search?fromairport=${fromairport}&toairport=${toairport}&class=${
          kelas === 'First Class' ? 'firstclass' : kelas
        }&startDate=${startDate}&endDate='2024-12-02'
        `
      )

      const data = response.data.data
      if (response?.status === 200 || response?.status === 201) {
        dispatch(setFlightsByCity(data))
      }
      console.log('response sss :>> ', response)
    } catch (error) {
      console.log('error', error)
    }
  }

export const getFlightRecomendation = (country) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_DOMAIN_API_DEV
      }/api/v1/flights/recommendation?fromcountry=${country}&limit=${10}`
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setFlightRecomendation(data))
    }
    console.log('response flight :>> ', data)
  } catch (error) {
    console.log(error)
  }
}

export const getFlightsByCity = (city) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_DOMAIN_API
      }/api/v1/flights/search-city-or-country?city=${city}&limit=10`
    )
    const data = response.data.data
    console.log('response', response)
    alert('excute by city')
    if (response.status === 200 || response.status === 201) {
      dispatch(setFlightsByCity(data))
    }
    console.log('response bandara berdasarkan city :>> ', data)
  } catch (error) {
    console.log('error', error)
  }
}
