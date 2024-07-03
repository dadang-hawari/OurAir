import axios from 'axios'
import { toast } from 'react-toastify'
import {
  setFligthLists,
  setFlightsByCity,
  setFlightRecomendation,
  setFlightDetail,
} from '../reducers/flightsReducer'

export const getAllFlights = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_DOMAIN_API_DEV
      }/api/v1/flights/search-or-fetch-all-flight-from?page=1&limit=9999`
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setFligthLists(data))
    }
  } catch (error) {
    toast(error?.response?.data?.errors[0]?.msg, {
      toastId: 'toastError',
      className: 'toast-error',
    })
  }
}

export const getFlightByCityorCountry =
  (fromairport, toairport, kelas, startDate, endDate, limit = 10, page = 1) =>
  async (dispatch, state) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DOMAIN_API_DEV
        }/api/v1/flights/search?fromairport=${fromairport}&toairport=${toairport}&limit=${limit}&page=${page}` +
          `${kelas ? `&class=${kelas === 'First Class' ? 'firstclass' : kelas}` : ''}` +
          `${startDate ? `&startDate=${startDate}` : ''}` +
          `${endDate ? `&endDate=${endDate}` : ''}`
      )
      const data = response.data.data
      if (response?.status === 200 || response?.status === 201) {
        dispatch(setFlightsByCity(data))
        dispatch(setFlightDetail(response?.data))
      }
    } catch (error) {
      toast(error?.response?.data?.errors[0]?.msg, {
        toastId: 'toastError',
        className: 'toast-error',
      })
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
  } catch (error) {
    toast(error?.response?.data?.errors[0]?.msg, {
      toastId: 'toastError',
      className: 'toast-error',
    })
  }
}

export const getFlightsByCity = (city) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_DOMAIN_API_DEV
      }/api/v1/flights/search-city-or-country?city=${city}&limit=10`
    )
    const data = response.data.data

    if (response.status === 200 || response.status === 201) {
      dispatch(setFlightsByCity(data))
    }
  } catch (error) {
    toast(error?.response?.data?.errors[0]?.msg, {
      toastId: 'toastError',
      className: 'toast-error',
    })
  }
}
