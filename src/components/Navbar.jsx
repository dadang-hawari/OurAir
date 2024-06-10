import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '/assets/images/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faList } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../redux/actions/authAction'
import iconFaBell from '../../public/assets/images/fi_bell.svg'
import iconFaUser from '../../public/assets/images/fi_user.svg'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout = () => {
    setConfirmLogout(true)
  }

  const handleConfirmLogout = () => {
    dispatch(logout())
    setConfirmLogout(false)
  }

  const handleCancelLogout = () => {
    setConfirmLogout(false)
  }

  return (
    <>
      <nav
        className={`fixed top-2 left-0 right-0 z-10 bg-transparent p-4 transition-all ${
          isSticky ? 'shadow-md' : ''
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-black text-lg font-bold">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-12" />
            </Link>
          </div>

          {/* Button buat setelah login */}
          {token ? (
            <div className="flex items-center space-x-4">
              <button onClick={handleLogout}>Keluar</button>
              <ul>
                <Link to="/login">
                  <FontAwesomeIcon icon={faList} className=" px-2 h-5 mt-1" />
                </Link>
              </ul>
              <ul>
                <Link to="/Notification">
                  <img src={iconFaBell} alt="faBell" className="px-2 h-6" />
                </Link>
              </ul>
              <ul>
                <Link to="/Notification">
                  <img src={iconFaUser} alt="faUser" className="px-2 h-6" />
                </Link>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="flex space-x-4">
                <Link
                  to="/login"
                  className="bg-white hover:bg-gray-100 text-gray-900 py-2 px-5 w-28 rounded-xl flex items-center"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="h-4 w-3 mr-2" />
                  Masuk
                </Link>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/*  modal logout */}
      {confirmLogout && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">tetap ingin keluar?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleCancelLogout} className="px-4 py-2 bg-gray-300 rounded-lg">
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
