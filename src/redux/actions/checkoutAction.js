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
export const postBooking = (passengers, navigate) => async (dispatch, getState) => {
  const token = getState()?.auth?.token // Ideally, use a secure storage mechanism

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/booking/create`,
      { passengers: passengers, baby: 4 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = response.data.data

    // Dispatch action if needed
    // if (response.status === 200 || response.status === 201) {
    //   dispatch(setFlightDetail(data));
    // }

    console.log('response booking :>> ', data)
    console.log('response', response)

    // Navigate if needed
    // navigate('/desired-path');
  } catch (error) {
    console.log(error)
  }
}
