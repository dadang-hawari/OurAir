import axios from 'axios'
import { toast } from 'react-toastify'
import { setEmail } from '../reducers/otpReducers'
import {
  setIsLoggedIn,
  setToken,
  setUserData,
  logout as logoutAction,
} from '../reducers/authReducer'
import { setPrevPage } from '../reducers/notifReducer'

const loadingMessage = 'Mohon tunggu sebentar..'
const toastIdWait = 'toasWait'

export const registUser = (phone_number, name, email, password, navigate) => async (dispatch) => {
  try {
    toast.loading(loadingMessage, {
      toastId: toastIdWait,
    })
    const response = await axios.post(`${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/signup`, {
      phone_number,
      name,
      email,
      password,
    })

    // toast.dismiss("toastLoading");
    if (response?.status === 201) {
      toast.dismiss(toastIdWait)
      dispatch(setEmail(email))
      navigate('/otp', {
        state: { success: `Kode OTP dikirimkan ke email ${email}` },
      })
    }
  } catch (error) {
    toast.dismiss(toastIdWait)
    if (error?.response?.status === 409)
      toast('Akun ini sudah terdatar', { toastId: 'toastInfo', className: 'toast-info' })
    else if (error?.response?.data?.errors[0])
      error?.response?.data?.errors[0]?.msg ===
      'Phone number must be between 10 and 15 characters long'
        ? toast('Panjang nomor hp harus antara 10 hingga 15 karakter', {
            className: 'toast-error',
            toastId: 'toastError',
          })
        : toast(error?.response?.data.errors[0].msg, {
            className: 'toast-error',
            toastId: 'toastError',
          })
    else
      toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
        className: 'toast-error',
        toastId: 'toastError',
      })
  }
}
export const verifyOTP = (email, otp, navigate) => async (dispatch) => {
  try {
    toast.loading(loadingMessage, {
      toastId: toastIdWait,
    })

    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/verify-email-token`,
      {
        email,
        otp,
      }
    )

    if (response?.status === 201) {
      toast.dismiss(toastIdWait)
      navigate('/login', { state: { success: 'Akun berhasil diverifikasi' } })
      dispatch(setEmail(null))
    } else {
      toast.dismiss(toastIdWait)

      toast('Token invalid atau expired', {
        toastId: 'toastInfo',
        className: 'toast-error',
      })
    }
  } catch (error) {
    toast.dismiss(toastIdWait)
    if (error?.response?.status === 401) {
      error?.response?.data?.message === 'Invalid or expired OTP'
        ? toast('Kode OTP invalid atau expired', {
            className: 'toast-error',
            toastId: 'toast-error',
          })
        : toast(error?.response?.data?.message, {
            className: 'toast-error',
            toastId: 'toast-error',
          })
    } else
      toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
        className: 'toast-error',
        toastId: 'toast-error',
      })
  }
}
export const sendVerifyOtp = (email) => async () => {
  try {
    toast.loading(loadingMessage, {
      toastId: toastIdWait,
    })
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/try-send-email`,
      {
        email,
      }
    )

    if (response?.status === 201) {
      toast.dismiss(toastIdWait)
      toast('Kode OTP baru berhasil dikirim', {
        className: 'success-toast',
        toastId: 'toastSuccess',
      })
    }
  } catch (error) {
    toast.dismiss(toastIdWait)
    toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
      className: 'toast-error',
      toastId: 'toast-error',
    })
  }
}

export const resetPassword = (token, password, navigate) => async () => {
  toast.loading(loadingMessage, {
    toastId: toastIdWait,
  })
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/reset-password-do-login`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response?.status === 200 || response?.status === 201) {
      toast.dismiss('toastLoading')
      navigate('/login', {
        state: {
          success: 'Password berhasil diubah',
        },
      })
    }
  } catch (error) {
    toast.dismiss('toastLoading')

    error?.response?.data?.errors[0]?.msg
      ? toast(error?.response?.data.errors[0].msg, {
          className: 'toast-error',
          toastId: 'toastError',
        })
      : toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
          className: 'toast-error',
          toastId: 'toastError',
        })
  }
}

export const authGoogleUser = (token, navigate) => async (dispatch, state) => {
  console.log('state', state)
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/who-am-i`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = response?.data.data
    if (response?.status === 200) {
      dispatch(setUserData(data))
      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))
      navigate('/', {
        state: {
          success: 'Berhasil masuk',
        },
      })
    }
  } catch (error) {
    error?.response?.data?.errors[0]?.msg
      ? toast(error?.response?.data.errors[0].msg, {
          className: 'toast-error',
          toastId: 'toastError',
        })
      : toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
          className: 'toast-error',
          toastId: 'toastError',
        })
  }
}

export const forgotPassword = (email, navigate) => async () => {
  try {
    toast.loading(loadingMessage, {
      toastId: toastIdWait,
    })

    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/forgot-password-send-email`,
      {
        email,
      }
    )

    if (response?.status === 201 || response?.status === 200) {
      toast.dismiss(toastIdWait)
      navigate('/login', {
        state: {
          success: `Link reset password telah dikirimkan ke email ${email}`,
        },
      })
    }
  } catch (error) {
    toast.dismiss(toastIdWait)
    if (error?.response?.status === 404)
      toast('Akun ini belum terdatar', { toastId: 'toastInfo', className: 'toast-info' })
    else
      error?.response?.data?.errors[0]?.msg
        ? toast(error?.response?.data.errors[0].msg, {
            className: 'toast-error',
            toastId: 'toastError',
          })
        : toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
            className: 'toast-error',
            toastId: 'toastError',
          })
  }
}

export const loginUser = (email, password, navigate, prevPage) => async (dispatch) => {
  try {
    toast.loading(loadingMessage, {
      toastId: toastIdWait,
    })
    const response = await axios.post(`${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/signin`, {
      email,
      password,
    })
    const data = response?.data.data
    if (response?.data.message === 'success') {
      if (data?.isVerified) {
        toast.dismiss(toastIdWait)
        dispatch(setToken(data.token))
        dispatch(setUserData(data))
        dispatch(setIsLoggedIn(true))
        navigate(prevPage ? prevPage : '/', {
          state: {
            success: 'Berhasil Masuk',
          },
        })
        dispatch(setPrevPage(null))
      } else {
        dispatch(setEmail(data?.email))
        navigate('/otp', {
          state: {
            success: 'Silahkan melakukan verifikasi terlebih dahulu',
          },
        })
      }
    }
  } catch (error) {
    toast.dismiss(toastIdWait)

    if (error?.response?.status === 409)
      toast('Email atau Password yang Anda masukkan Salah', {
        className: 'toast-error',
        toastId: 'toastError',
      })
    else if (error?.response?.status === 404)
      toast('Akun belum terdaftar', {
        toastId: 'toastInfo',
        className: 'toast-info',
      })
    else if (error?.response?.data?.message === 'your account is registered by google !') {
      toast('Silahkan login mengggunakan akun Google Anda', {
        toastId: 'toastInfo',
        className: 'toast-info',
      })
    } else
      toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
        className: 'toast-error',
        toastId: 'toastError',
      })
  }
}

export const logout = (navigate) => async (dispatch) => {
  navigate('/login', {
    state: {
      success: 'Berhasil Keluar',
    },
  })
  dispatch(logoutAction())
}

export const updateUser = (name, email, phone_number, token) => async (dispatch) => {
  toast.loading('Mohon tunggu sebentar...', {
    toastId: 'toastWait',
  })
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/users/profile`,
      {
        name: name,
        username: name,
        phone_number: phone_number,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = response.data.data
    if (response?.status === 200 || response?.status === 201) {
      toast.dismiss('toastWait')

      dispatch(setUserData(data))
      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))
      toast('Data anda telah berhasil disimpan!', {
        className: 'success-toast',
        toastId: 'successToast',
      })
    }
    toast.dismiss('toastWait')
  } catch (error) {
    toast.dismiss('toastWait')

    error?.response?.data?.errors[0]?.msg
      ? toast(error?.response?.data.errors[0].msg, { className: 'toast-error' })
      : toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
          className: 'toast-error',
          toastId: 'toastError',
        })
  }
}

export const validateUser = (token, navigate) => async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/who-am-i`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    navigate('/', {
      state: {
        error: 'Anda tidak punya akses ke halaman ganti password',
      },
    })
    error?.response?.data?.errors[0]?.msg
      ? toast(error?.response?.data.errors[0].msg, {
          className: 'toast-error',
          toastId: 'toastError',
        })
      : toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
          className: 'toast-error',
          toastId: 'toastError',
        })
  }
}

export const getUsersProfile = (navigate) => async (dispatch, state) => {
  const token = state()?.auth?.token
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_API}/api/v1/auth/who-am-i`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = response?.data.data
    if (response?.status === 200) {
      dispatch(setUserData(data))
      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))
    }
  } catch (error) {
    error?.response?.data?.errors[0]?.msg
      ? toast(error?.response?.data.errors[0].msg, { className: 'toast-error' })
      : toast('Coba lagi nanti, saat ini ada kesalahan di sistem kami', {
          className: 'toast-error',
        })
  }
}

export const updateProfile = (imageFile, token) => async (dispatch) => {
  toast.loading('Mohon tunggu sebentar...', {
    toastId: 'toastWait',
  })
  try {
    const formData = new FormData()
    formData.append('avatar', imageFile)
    const response = await axios.put(
      `${import.meta.env.VITE_DOMAIN_API}/api/v1/users/avatar-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    toast.dismiss('toastWait')
    return response
  } catch (error) {
    toast.dismiss('toastWait')
    const errorMsg =
      error?.response?.data?.errors[0]?.msg ||
      'Coba lagi nanti, saat ini ada kesalahan di sistem kami'
    toast(errorMsg, {
      className: 'toast-error',
      toastId: 'toastError',
    })
  }
}
