import axios from 'axios'
import { toast } from 'react-toastify'
import { setFligthLists, setFlightsByCity, setFlightRecomendation, setFlightDetail } from '../reducers/flightsReducer'

export const getAllFlights = () => async (dispatch) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/search-or-fetch-all-flight-from?page=1&limit=9999`)
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setFligthLists(data))
    }
  } catch (error) {
    console.error('error', error)
  }
}

export const getFlightByCityorCountry =
  (fromairport, toairport, kelas, startDate, endDate, limit = 10, page = 1) =>
  async (dispatch, state) => {
    console.log('state city or country', state().jadwalPenerbangan)
    console.log('kelasnya', kelas)
    console.log('nilai fromairport', fromairport)
    console.log('nilai toairport', toairport)
    try {
      const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/search?fromairport=${fromairport}&toairport=${toairport}&limit=${limit}&page=${page}` + `${kelas ? `&class=${kelas === 'First Class' ? 'firstclass' : kelas}` : ''}` + `${startDate ? `&startDate=${startDate}` : ''}` + `${endDate ? `&endDate=${endDate}` : ''}`)
      const data = response.data.data
      if (response?.status === 200 || response?.status === 201) {
        dispatch(setFlightsByCity(data))
        dispatch(setFlightDetail(response?.data))
      }
      console.log('response sss :>> ', response)
    } catch (error) {
      console.log('error', error)
    }
  }

export const getFlightRecomendation = (country) => async (dispatch) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/recommendation?fromcountry=${country}&limit=${10}`)
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
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/search-city-or-country?city=${city}&limit=10`)
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
