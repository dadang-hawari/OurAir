import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useResolvedPath } from 'react-router-dom'
import Logo from '/assets/images/logoFooter.webp'
import LogoTwo from '/assets/images/Group 101.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt,
  faList,
  faArrowLeft,
  faUser,
  faChevronDown,
  faBell,
  faXmark,
  faChevronRight,
  faChevronLeft,
  faClockRotateLeft,
  faCircleInfo,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { logout } from '../redux/actions/authAction'
import iconFaBell from '/assets/images/fi_bell.svg'
import iconFaUser from '/assets/images/fi_user.svg'
import { getNotification, getNotificationById } from '../redux/actions/notificationAction'
import { formatTimeToHM, formatTimeToIndonesia } from '../utils/timeFormatter'
import { io } from 'socket.io-client'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotification, setShowNotifcation] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const notification = useSelector((state) => state?.notification?.notification?.notifications)
  const hasUnreadNotifications = notification?.some((notif) => !notif.is_read)
  const maxNotificationToShow = notification?.slice(0, 3)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const path = useResolvedPath().pathname
  const [width, setWidth] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
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
    dispatch(logout(navigate))
    setConfirmLogout(false)
    setSidebarVisible(false)
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
  }

  const handleNotificationDropdown = () => {
    setShowProfileDropdown(false)
    setShowNotifcation(!showNotification)
  }

  const getNotificationList = () => {
    if (token) dispatch(getNotification(navigate))
  }

  const navigateToRiwayat = (id) => {
    setShowNotifcation(false)
    dispatch(getNotificationById(id, navigate))
  }

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  const windowListener = () => {
    window.addEventListener('resize', handleResize)
  }

  useEffect(() => {
    windowListener()
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    getNotificationList()
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-10 p-4 transiti-colors duration-500 select-none ${
          path !== '/' && 'shadow-md bg-white bg-opacity-40 backdrop-blur-sm'
        } ${isSticky ? 'bg-white bg-opacity-40 backdrop-blur-sm shadow-md ' : 'bg-transparent'}`}
      >
        <div className="mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className={`text-lg font-bold  `}>
            <Link to="/">
              <img
                src={path === '/' && !isSticky && width > 780 ? LogoTwo : Logo}
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Button buat setelah login */}
          {token ? (
            <div className="flex items-center space-x-4">
              <ul>
                <button onClick={sideBar}>
                  <FontAwesomeIcon icon={faList} className=" h-5 mt-1 text-gray-900" />
                </button>
              </ul>
              <ul className="relative">
                <button className="relative" onClick={handleNotificationDropdown}>
                  <img src={iconFaBell} alt="faBell" className="px-2 h-6 mt-1 w-10" />
                  <div
                    className={`${
                      hasUnreadNotifications && 'bg-red-600'
                    } absolute right-3 top-1  h-2 w-2 rounded-full`}
                  ></div>
                </button>
                {showNotification && (
                  <div
                    className={`absolute bg-white pt-7 text-xs shadow-md rounded-md top-10 -right-10  w-[250px] sm:right-1 mini:w-[300px] sm:w-200px md:w-[400px] 
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={handleNotificationDropdown}
                    />
                    {maxNotificationToShow?.map((notification, i) => (
                      <React.Fragment key={i}>
                        <div
                          className={`  pt-1 cursor-pointer px-4
                          
                          ${!notification?.is_read && 'bg-gray-100'}
                          `}
                          onClick={() => navigateToRiwayat(notification?.id)}
                        >
                          <div className="flex text-[10px] py-2  text-[#8A8A8A] w-full ">
                            <div className="bg-secondary rounded-full h-5 w-5 px-2 flex items-center justify-center">
                              <FontAwesomeIcon icon={faBell} className="text-white h-3 w-3 " />
                            </div>
                            <div className="ml-4 w-full ">
                              <div className="flex w-full justify-between">
                                <span>{notification?.title}</span>
                                <span>{`${formatTimeToIndonesia(
                                  notification?.created_at
                                )} ${formatTimeToHM(notification?.created_at)}`}</span>
                              </div>
                              <div className="text-sm text-gray-900">{notification?.message}</div>
                              <Link
                                to={notification?.link}
                                target="_blank"
                                className={`${
                                  notification?.link ? '' : 'hidden'
                                } text-xs text-blue-400`}
                              >
                                Link Pembayaran Tiket Pesawat
                              </Link>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    ))}

                    <Link
                      to={'/notification'}
                      className="text-blue-400 mt-2 pt-3 pb-4 block w-fit px-4 "
                    >
                      Lihat semua notifikasi <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </div>
                )}
              </ul>
              <ul className="flex items-center gap-x-2 flex-row-reverse  relative">
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
                    className={`transition-transform duration-200 text-gray-900 ${
                      showProfileDropdown ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
                {showProfileDropdown && (
                  <div className="absolute bg-white p-5 transition-all shadow-md rounded-md w-fit px-10 top-10 right-1 ">
                    <Link to="/profile">Profile</Link>
                    <div className="text-red-400 mt-1 cursor-pointer" onClick={handleLogout}>
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
                  className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 py-2 px-5 w-28 rounded-xl flex items-center"
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
        <div className="w-full h-full" onClick={sideBar}></div>
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <button
              onClick={sideBar}
              className="flex items-center mt-4  py-2 text-base text-gray-700 hover:text-blue-500 rounded-lg"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Kembali
            </button>

            {/* Menu */}
            <div className="flex flex-col gap-3 mt-4 ">
              <Link
                to="/"
                className={`hover:text-blue-500 text-base ${
                  path === '/' ? 'cursor-default text-blue-500' : 'text-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={faHouse} className="mr-2" />
                Beranda
              </Link>
              <hr />
              <Link
                to="/riwayat-pemesanan"
                className={`hover:text-blue-500 text-base ${
                  path === '/riwayat-pemesanan' ? 'cursor-default text-blue-500' : 'text-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={faClockRotateLeft} className="mr-2" />
                Riwayat Pesanan
              </Link>
              <hr />
              <Link
                to="/about"
                className={`hover:text-blue-500 ${
                  path === '/tentang' ? 'cursor-default text-blue-500' : 'text-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                Tentang kami
              </Link>
              <hr />
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
