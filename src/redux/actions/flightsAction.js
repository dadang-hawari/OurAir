import axios from 'axios'
import { toast } from 'react-toastify'
import { setFligthLists } from '../reducers/flightsReducer'
const loadingMessage = 'Mohon tunggu sebentar..'
const toastIdWait = 'toasWait'

export const getAllFlights = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_DOMAIN_API_DEV
      }/api/v1/flights/search-or-fetch-all-flight-from?page=1&limit=9999`
    )
    const data = response.data.data
    if (response.status === 200) {
      toast.dismiss(toastIdWait)

      dispatch(setFligthLists(data))
    }
    console.log('response login :>> ', data)
  } catch (error) {
    console.error('error', error)
  }
}
