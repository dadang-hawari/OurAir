import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Beranda/Header'
import Toast from '../components/common/Toast'
import Navbar from '../components/Navbar'
import ButtonPrimary from '../components/ButtonPrimary'
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
      <Navbar />
      <Header />

      {/* Destinasi Favorit */}
      <div className="mt-64 max-w-5xl mx-auto px-4">
        <h2 className="font-bold ">Destinasi Favorit</h2>
        <button className="text-sm text-white max-w-32 w-full h-12 my-4 rounded-xl bg-secondary">
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Semua
        </button>
        <div className="flex flex-wrap justify-around gap-y-4">
          <div>
            <img
              src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593"
              alt='Jakarta'
              className="max-w-[232.5px] mb-2 h-auto object-cover rounded-md"
            />
            <h2 className="font-[600]">Jakarta - Manila</h2>
            <b className="text-xs text-secondary">AirAsia</b>
            <p>20 - 30 Maret 2023</p>
            <p>
              Mulai dari <b className="text-red-500">IDR 950.00</b>
            </p>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593"
              alt='Jakarta'
              className="max-w-[232.5px] mb-2 h-auto object-cover rounded-md"
            />
            <h2 className="font-[600]">Jakarta - Manila</h2>
            <b className="text-xs text-secondary">AirAsia</b>
            <p>20 - 30 Maret 2023</p>
            <p>
              Mulai dari <b className="text-red-500">IDR 950.00</b>
            </p>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593"
              alt='Jakarta'
              className="max-w-[232.5px] mb-2 h-auto object-cover rounded-md"
            />
            <h2 className="font-[600]">Jakarta - Manila</h2>
            <b className="text-xs text-secondary">AirAsia</b>
            <p>20 - 30 Maret 2023</p>
            <p>
              Mulai dari <b className="text-red-500">IDR 950.00</b>
            </p>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593"
              alt='Jakarta'
              className="max-w-[232.5px] mb-2 h-auto object-cover rounded-md"
            />
            <h2 className="font-[600]">Jakarta ❯ Manila</h2>
            <b className="text-xs text-secondary">AirAsia</b>
            <p>20 - 30 Maret 2023</p>
            <p>
              Mulai dari <b className="text-red-500">IDR 950.00</b>
            </p>
          </div>
        </div>
      </div>
      <Toast
        autoClose={3000}
        position="bottom-center"
        transition={Bounce}
        margin="mt-0"
      />
      <Footer />
    </div>
  )
}
