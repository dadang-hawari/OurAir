import axios from 'axios'
import { setFlightDetail, setFlightSeats } from '../reducers/flightsReducer'

export const getFlightById = (id) => async (dispatch) => {
  try {
    console.log('idny', id)
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/search-by-id?id=${id}`
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setFlightDetail(data))
      dispatch(setFlightSeats(response.data.result[0]))
    }
    console.log('data', data)
  } catch (error) {
    console.log(error)
  }
}
export const postBooking = (passenggers, navigate, token) => async () => {
  try {
    console.log({ passenggers: passenggers })
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/flights/booking/create`,
      {},
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
