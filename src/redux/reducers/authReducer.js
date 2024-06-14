import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: 'rjeejr',
  userData: null,
  loginWith: null,
  isLoggedin: false,
}

const primaryLogin = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setLoginWith: (state, action) => {
      state.loginWith = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedin = action.payload
    },
    logout: (state) => {
      state.token = null
      state.userData = null
      state.isLoggedin = false
    },
  },
})

export const { setToken, setUserData, setLoginWith, setIsLoggedIn, logout } = primaryLogin.actions
export default primaryLogin.reducer
