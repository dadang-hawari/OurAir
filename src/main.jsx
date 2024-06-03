import React from 'react'
import ReactDOM from 'react-dom/client'
import Route from './Route.jsx'
import './styles/index.css'
import './styles/main.css'
import './styles/toast.css'
import './styles/calendar.css'
import 'react-toastify/dist/ReactToastify.css'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
