import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'
import authReducer from './reducers/authReducer'
import otpReducer from './reducers/otpReducers'
import jadwalPenerbanganReducer from './reducers/jadwalPenerbanganReducer'
import flightsReducer from './reducers/flightsReducer'
import checkoutReducer from './reducers/checkoutReducer'
import notifReducer from './reducers/notifReducer'
import paymentHistoryReducer from './reducers/paymentHistoryReducer'
import sdgsReducer from './reducers/sdgsReducers'

const rootReducers = combineReducers({
  auth: authReducer,
  otp: otpReducer,
  jadwalPenerbangan: jadwalPenerbanganReducer,
  flightLists: flightsReducer,
  checkout: checkoutReducer,
  notification: notifReducer,
  payment: paymentHistoryReducer,
  sdgs: sdgsReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['otp', 'auth', 'jadwalPenerbangan', 'checkout'],
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
})

export const persistor = persistStore(store)
