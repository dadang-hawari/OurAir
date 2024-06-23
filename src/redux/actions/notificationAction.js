import axios from 'axios'
import { setFlightDetail, setFlightSeats } from '../reducers/flightsReducer'
import {
  assignSeatsToPassengers,
  resetSelectedSeats,
  setTransaction,
} from '../reducers/checkoutReducer'
import { toast } from 'react-toastify'
import { setNotification } from '../reducers/notifReducer'

export const getNotification = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/notification/notifications?page=1&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      }
    )
    const data = response.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setNotification(data))
    }
    console.log('data', data)
  } catch (error) {
    console.log(error)
  }
}
