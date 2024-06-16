import axios from 'axios'
import { toast } from 'react-toastify'
import { setFlightsByCountry, setFligthLists, setFlightsByCity } from '../reducers/flightsReducer'

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

export const getFlightByCityorCountry = (country) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/flights/search-city-or-country?country=${country}`
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setFlightsByCountry(data))
    }
    console.log('response flight :>> ', data)
  } catch (error) {
    console.log('error', error)
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
    if (response.status === 200 || response.status === 201) {
      dispatch(setFlightsByCity(data))
    }
    console.log('response bandara berdasarkan city :>> ', data)
  } catch (error) {
    console.log('error', error)
  }
}
