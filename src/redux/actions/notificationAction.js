import axios from 'axios'
import { setFlightDetail, setFlightSeats } from '../reducers/flightsReducer'
import {
  assignSeatsToPassengers,
  resetSelectedSeats,
  setTransaction,
} from '../reducers/checkoutReducer'
import { toast } from 'react-toastify'
import { setNotification } from '../reducers/notifReducer'
import { logout } from './authAction'
import { setIsLoggedIn, setToken, setUserData } from '../reducers/authReducer'

export const getNotification = (navigate) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/notification/notifications?page=1&limit=100`,
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
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(setToken(null))
      dispatch(setUserData(null))
      dispatch(setIsLoggedIn(false))
      navigate('/login', {
        state: {
          error: 'Token expired silahkan login kembali',
        },
      })
    }
  }
}

export const getNotificationById = (id, navigate) => async (dispatch, getState) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/notification/notifications/${id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      }
    )
    const data = response.data.notification
    dispatch(getNotification(navigate))
  } catch (error) {}
}

export const readAllNotification = (navigate) => async (dispatch, getState) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/notification/notifications/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      }
    )
    const data = response.data.notification
    if (response?.status === 200) {
      dispatch(getNotification(navigate))
    }
  } catch (error) {}
}
