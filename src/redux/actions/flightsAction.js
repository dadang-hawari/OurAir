import axios from 'axios'
import { toast } from 'react-toastify'
import { setFlightsByCountry, setFligthLists } from '../reducers/flightsReducer'
const loadingMessage = 'Mohon tunggu sebentar..'
const toastIdWait = 'toasWait'

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
