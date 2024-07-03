import axios from 'axios'
import { setPaymentHistory, setWaitingTransaction } from '../reducers/paymentHistoryReducer'
import { toast } from 'react-toastify'

export const getTransaction = () => async (dispatch, state) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/transactions/history`,
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
  } catch (error) {
    if (error?.response?.status === 401) {
      toast('Token expired, silahkan login kembali', {
        className: 'toast-error',
        toastId: ' toast-error',
      })
    } else toast(error?.response?.data?.message[0])
  }
}
export const getTransactionById = (idnya) => async (dispatch, state) => {
  const id = idnya ? idnya : state()?.checkout?.transactionId
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/transactions/search-transaction-history?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${state()?.auth?.token}`,
        },
      }
    )
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setWaitingTransaction(data))
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      toast('Token expired, silahkan login kembali', {
        className: 'toast-error',
        toastId: ' toast-error',
      })
    } else toast(error?.response?.data?.message[0])
  }
}
