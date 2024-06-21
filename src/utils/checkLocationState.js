import { toast } from 'react-toastify'

export const checkLocationState = (location, navigate) => {
  window.scrollTo(0, 0)
  if (location.state) {
    if (location.state.info) {
      toast.info(location.state.info, {
        toastId: 'toastInfo',
      })
    } else if (location.state.success) {
      toast(location.state.success, { className: 'success-toast' })
    }
    navigate('.', { state: false })
  }
}
