import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Beranda/Header'
import Toast from '../components/common/Toast'
import Navbar from '../components/Navbar'
import DestinasiFavorit from '../components/Beranda/FavoriteDestination'
import { useEffect } from 'react'
import { checkLocationState } from '../utils/checkLocationState'
import { Bounce } from 'react-toastify'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
      <Toast autoClose={3000} position="bottom-center" transition={Bounce} margin="mt-0" />
      <Footer />
    </div>
  )
}
