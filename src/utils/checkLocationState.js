import { Bounce, Flip, toast } from 'react-toastify'

export const checkLocationState = (location, navigate, tranisiton = Flip) => {
  window.scrollTo(0, 0)
  if (location.state) {
    if (location.state.info) {
      toast(location.state.info, {
        toastId: 'toastInfo',
        className: 'toast-info',
        tranisiton: tranisiton,
      })
    } else if (location.state.success) {
      toast(location.state.success, {
        className: 'success-toast',
        toastId: 'toastSuccess',
        tranisiton: tranisiton,
      })
    } else {
      toast(location.state.error, {
        className: 'toast-error',
        toastId: 'toastError',
        tranisiton: tranisiton,
      })
    }
    navigate('.', { state: false })
  }
}
