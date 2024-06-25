import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '/assets/images/logoFooter.webp'
import LogoTwo from '/assets/images/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt,
  faList,
  faArrowLeft,
  faDoorOpen,
  faUser,
  faChevronDown,
  faBell,
  faXmark,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { logout } from '../redux/actions/authAction'
import iconFaBell from '/assets/images/fi_bell.svg'
import iconFaUser from '/assets/images/fi_user.svg'
import { getNotification } from '../redux/actions/notificationAction'
import { formatTimeToHM, formatTimeToIndonesia } from '../utils/timeFormatter'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotification, setShowNotifcation] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const notification = useSelector((state) => state?.notification?.notification?.notifications)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    setSidebarVisible(false) // Menutup sidebar
  }

  const handleCancelLogout = () => {
    setConfirmLogout(false)
  }

  const sideBar = () => {
    setShowProfileDropdown(false)
    setShowNotifcation(false)
    setSidebarVisible(!sidebarVisible)
  }
  const handleProfileDropdown = () => {
    setShowNotifcation(false)
    setShowProfileDropdown(!showProfileDropdown)
    console.log('showProfileDropdown', showProfileDropdown)
  }

  const handleNotificationDropdown = () => {
    setShowProfileDropdown(false)
    setShowNotifcation(!showNotification)
  }

  const getNotificationList = () => {
    dispatch(getNotification())
  }

  const navigateToRiwayat = () => {
    setShowNotifcation(false)
    navigate('/riwayat-pemesanan')
  }

  useEffect(() => {
    getNotificationList()
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-10 p-4 transiti-colors duration-500 select-none ${
          isSticky ? 'bg-white bg-opacity-40 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-black text-lg font-bold">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Button buat setelah login */}
          {token ? (
            <div className="flex items-center space-x-4">
              <ul>
                <button onClick={sideBar}>
                  <FontAwesomeIcon icon={faList} className="px-2 h-5 mt-1" />
                </button>
              </ul>
              <ul className="relative">
                <button className="relative" onClick={handleNotificationDropdown}>
                  <img src={iconFaBell} alt="faBell" className="px-2 h-6" />
                  <div
                    className={`${''} absolute right-3 top-0 bg-red-600 h-2 w-2 rounded-full`}
                  ></div>
                </button>
                {showNotification && (
                  <div
                    className={`absolute bg-white bg-opacity-90 p-5 text-xs shadow-md rounded-md top-10  right-1 w-[300px] sm:w-200px md:w-[400px] ${
                      !notification?.isRead && 'bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={handleNotificationDropdown}
                    />
                    {notification?.map((notification, i) => (
                      <>
                        <div key={i} className="my-2 cursor-pointer" onClick={navigateToRiwayat}>
                          <div className="flex text-[10px] text-[#8A8A8A] ">
                            <div className="bg-secondary rounded-full h-5 w-5 px-2 flex items-center justify-center">
                              <FontAwesomeIcon icon={faBell} className="text-white h-3 w-3 " />
                            </div>
                            <div className="ml-4 ">
                              <div className="flex w-full justify-between">
                                <span>{notification?.title}</span>
                                <span>{`${formatTimeToIndonesia(
                                  notification?.created_at
                                )} ${formatTimeToHM(notification?.created_at)}`}</span>
                              </div>
                              <div className="text-base text-black">{notification?.message}</div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    ))}

                    <Link to={'/notification'} className="text-blue-400 mt-2 py-1 block w-fit">
                      Lihat semua notifikasi <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </div>
                )}
              </ul>
              <ul className="flex items-center gap-x-2 flex-row-reverse cursor-pointer relative">
                <div
                  className="flex items-center gap-x-2 flex-row-reverse cursor-pointer"
                  onClick={handleProfileDropdown}
                >
                  <button>
                    <span className="bg-gray-300 block w-[30px] h-[30px] relative rounded-full">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"
                      />
                    </span>
                  </button>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-200 text-gray-700 ${
                      showProfileDropdown ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
                {showProfileDropdown && (
                  <div className="absolute bg-white bg-opacity-90 p-5 shadow-md rounded-md w-fit px-10 top-10 right-1 ">
                    <Link to="/profile">Profile</Link>
                    <div className="text-red-400 my-1 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </div>
                  </div>
                )}
              </ul>
            </div>
          ) : (
            <div className="flex space-x-4">
              <ul>
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

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-20 transition-all duration-300 ${
          sidebarVisible ? 'bg-black bg-opacity-50' : 'pointer-events-none'
        }`}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <button
              onClick={sideBar}
              className="flex items-center mt-4 px-2 py-2 text-black hover:text-blue-500 rounded-lg"
            >
              <FontAwesomeIcon icon={faArrowLeft} className=" h-5 mr-2" />
              Kembali
            </button>

            {/* Menu */}
            <div className="flex flex-col mt-4">
              <Link to="/profile" className="text-black hover:text-blue-500 mb-4">
                Profile
              </Link>
              <Link to="/about" className="text-black hover:text-blue-500 mb-4">
                Tentang kami
              </Link>
              <button onClick={handleLogout} className=" py-2  ">
                <span className="text-lg hover:text-red-500">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Logout */}
      {confirmLogout && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Tetap ingin keluar?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
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
