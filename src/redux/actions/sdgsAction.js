import axios from 'axios'
import { toast } from 'react-toastify'
import { setTotalDonation } from '../reducers/sdgsReducers'

export const getDonation = () => async (dispatch, state) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API}/api/v1/donation`)
    const data = response.data.data
    if (response.status === 200 || response.status === 201) {
      dispatch(setTotalDonation(data))
    }
  } catch (error) {
    toast(error?.response?.data?.message[0])
  }
}
