import axios from "axios";
import { toast } from "react-toastify";
import { setEmail } from "../reducers/otpReducers";

export const registUser = (name, password, email, phone_number, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/signup`, {
      phone_number,
      name,
      email,
      password,
    });

    toast.dismiss("toastLoading");
    if (response.status === 201) {
      dispatch(setEmail(email));
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
