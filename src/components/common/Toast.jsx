import { Flip, ToastContainer } from 'react-toastify'

export default function Toast({
  position = 'top-right',
  transition = Flip,
  autoClose = 2000,
  margin = 'mt-2',
}) {
  return (
    <ToastContainer
      position={position}
      closeOnClick="true"
      hideProgressBar="true"
      transition={transition}
      pauseOnFocusLoss={false}
      autoClose={autoClose}
      className={`${margin}`}
      closeButton={false}
    />
  )
}
