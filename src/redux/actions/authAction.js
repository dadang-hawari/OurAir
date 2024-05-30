import axios from "axios";
import { toast } from "react-toastify";
import { setEmail } from "../reducers/otpReducers";
import { setToken } from "../reducers/authReducer";

export const registUser = (phone_number, name, email, password, navigate) => async (dispatch) => {
  try {
    if ((!phone_number, !name, !email, !password)) return;
    toast.loading("Mohon tunggu sebentar..", {
      toastId: "toastWait",
    });
    const response = await axios.post(`${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/auth/signup`, {
      phone_number,
      name,
      email,
      password,
    });

    // toast.dismiss("toastLoading");
    if (response.status === 201) {
      dispatch(setEmail(email));
      navigate("/otp", { state: { success: response.data.message } });
    }

    console.log("response :>> ", response);
  } catch (error) {
    toast.dismiss();
    toast.error(error);
    console.error("Error:", error);
  }
};
export const verifyToken = (email, otp) => async (dispatch) => {
  try {
    console.log("email :>> ", email);
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/auth/verify-email-token`,
      {
        email,
        otp,
      }
    );
    toast.dismiss("toastLoading");
    console.log("response :>> ", response);
  } catch (error) {
    console.error("Error:", error);
  }
};
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    console.log("type of token :>> ", typeof token);
    console.log("type of password :>> ", typeof password);
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/auth/reset-password-do-login`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.dismiss("toastLoading");
    console.log("token :>> ", token);
    console.log("response :>> ", response);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const forgotPassword = (email) => async () => {
  try {
    console.log("email :>> ", email);
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/auth/forgot-password-send-email`,
      {
        email,
      }
    );
    toast.dismiss("toastLoading");
    console.log("response :>> ", response);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const loginUser =
  ({ email, password }, navigate) =>
  async (dispatch) => {
    try {
      toast.loading("wait", {
        toastId: "toastWait",
      });
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/auth/signin`,
        {
          email,
          password,
        }
      );
      const data = response.data.data;
      console.log("response login :>> ", response);
      if (response.status === 200) {
        dispatch(setToken(data.token));
        navigate("/", {
          state: {
            success: "Login successful",
          },
        });
        toast.dismiss("toastWait");
      }
    } catch (error) {
      toast.dismiss("toastWait");
      toast(error.response.data.message, { className: "toast-info", toastId: "toastWait" });
      console.error("error", error);
    }
  };
