import { Flip, ToastContainer } from "react-toastify";

export default function Toast({ autoClose = 2000, margin = "mt-2" }) {
  return (
    <ToastContainer
      position="top-right"
      closeOnClick="true"
      hideProgressBar="true"
      transition={Flip}
      pauseOnFocusLoss={true}
      autoClose={autoClose}
      className={`${margin}`}
      closeButton={false}
    />
  );
}
