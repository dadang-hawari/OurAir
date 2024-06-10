import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Beranda/Header'
import Toast from '../components/common/Toast'
import DestinasiFavorit from '../components/Beranda/FavoriteDestination'
import { useEffect } from 'react'
import { checkLocationState } from '../utils/checkLocationState'
import { Bounce, Flip } from 'react-toastify'
import Footer from './Footer'

export default function Beranda() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    checkLocationState(location, navigate)
  }, [])

  return (
    <div>
      <Header />
      {/* Destinasi Favorit */}
      <DestinasiFavorit />
      <Toast autoClose={3000} position="bottom-center" transition={Flip} margin="mt-0" />
      <Footer />
    </div>
  )
}
