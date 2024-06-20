import axios from 'axios'
import { setFlightDetail } from '../reducers/flightsReducer'

export const getFlightById = (id) => async (dispatch) => {
  try {
    console.log('idny', id)
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/search-by-id?id=${id}`
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setFlightDetail(data))
    }
    console.log('response id :>> ', data)
  } catch (error) {
    console.log(error)
  }
}
export const postBooking = (passenggers, navigate, token) => async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/booking/create`,
      {
        passenggers,
      },
      {
        headers: {
          Autorization: `Bearer ${token}`,
        },
      }
    )
    const data = response.data.data
    // if (response.status === 200 || response.status === 201) {
    //   dispatch(setFlightDetail(data))
    // }
    console.log('response booking :>> ', data)
  } catch (error) {
    console.log(error)
  }
}
