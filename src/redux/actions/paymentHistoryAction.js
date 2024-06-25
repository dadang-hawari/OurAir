import axios from 'axios'
import { setPaymentHistory } from '../reducers/paymentHistoryReducer'
import { toast } from 'react-toastify'

export const getTransaction = () => async (dispatch, state) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1//transactions/history`,
      {
        headers: {
          Authorization: `Bearer ${state()?.auth?.token}`,
        },
      }
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setPaymentHistory(data))
    }
    console.log('response', response)
    console.log('data', data)
    console.log('state', state()?.payment?.paymentHistory)
  } catch (error) {
    console.log('error?.response?.data?.message', error?.response?.status)
    if (error?.response?.status === 401) {
      toast('Token expired, silahkan login kembali', {
        className: 'toast-error',
        toastId: ' toast-error',
      })
    } else toast(error?.response?.data?.message)
    toast('tes')
  }
}
