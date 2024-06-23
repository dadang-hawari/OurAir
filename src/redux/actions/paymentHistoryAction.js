import axios from 'axios'
import { setPaymentHistory } from '../reducers/paymentHistoryReducer'

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
    console.log(error)
  }
}
