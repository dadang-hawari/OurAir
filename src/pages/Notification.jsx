import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBell, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import {
  getNotification,
  getNotificationById,
  readAllNotification,
} from '../redux/actions/notificationAction'
import { useDispatch, useSelector } from 'react-redux'
import { formatTimeToHM, formatTimeToIndonesia } from '../utils/timeFormatter'
import { customStylesFilter } from '../styles/customStyles'
import ReactModal from 'react-modal'
import SkeletonNotification from '../components/Notification/SkeletonNotification'

function Header({ openModal, text }) {
  return (
    <header className="w-full px-4 pt-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center space-x-4 relative">
          <div className="bg-accent rounded-lg text-white px-5 py-3 flex items-center space-x-2 w-full">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="h-4" />
              <span className="text-lg px-3">Beranda</span>
            </Link>
          </div>
          <button
            onClick={openModal}
            className="absolute flex right-4 border-2 rounded-md border-white text-white py-2 justifiy-between px-4 gap-x-2 items-center"
          >
            {text}
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </div>
    </header>
  )
}

const Notification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('Terbaru')
  const [isLoading, setIsLoading] = useState(false)

  const notification = useSelector((state) => state?.notification?.notification?.notifications)
  const isLoggedin = useSelector((state) => state?.auth?.isLoggedin)

  useEffect(() => {
    setIsLoading(true)
    if (!isLoggedin) {
      navigate('/login', {
        state: {
          error: 'Mohon login terlebih dahulu',
        },
      })
      return
    }
    dispatch(getNotification())
      .then(() => {
        dispatch(readAllNotification(navigate))
      })
      .then(() => setIsLoading(false))
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleNotificationClick = (id) => {
    dispatch(getNotificationById(id))
    dispatch(getNotification(navigate))
  }

  const sortedNotifications = [...(notification || [])].sort((a, b) => {
    if (statusFilter === 'Terbaru') {
      return new Date(b.created_at) - new Date(a.created_at)
    } else {
      return new Date(a.created_at) - new Date(b.created_at)
    }
  })

  ReactModal.setAppElement('#modal')

  return (
    <div className="mt-16 pb-20">
      <Navbar />
      <Header openModal={openModal} text={statusFilter} />
      <div className="max-w-3xl mx-auto mt-4">
        <ul>
          {isLoading ? (
            <SkeletonNotification />
          ) : notification?.length > 0 ? (
            sortedNotifications?.map((notification, i) => (
              <React.Fragment key={i}>
                <li
                  className={`w-full border-b  last:border-b-0 ${
                    notification?.is_read ? 'cursor-default' : 'bg-gray-100 cursor-pointer'
                  } `}
                  onClick={() => handleNotificationClick(notification?.id)}
                >
                  <div className="flex justify-between   p-4 items-center">
                    <div className="flex items-center gap-x-5 flex-grow w-full ">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="h-5 text-white self-center  bg-accent rounded-full  p-1"
                      />
                      <div>
                        <h2 className="text-gray-400">{notification?.title}</h2>
                        <p className="text-black">{notification?.message}</p>
                        <Link
                          to={notification?.link}
                          target="_blank"
                          className={`${notification?.link ? '' : 'hidden'} text-xs text-blue-400`}
                        >
                          Link Pembayaran Tiket Pesawat
                        </Link>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-6 w-56 text-right">
                      {`${formatTimeToIndonesia(notification.created_at)}  
                    ${formatTimeToHM(notification.created_at)}`}
                    </div>
                  </div>
                </li>
                <hr />
              </React.Fragment>
            ))
          ) : (
            <div className="text-center text-secondary text-xl mt-10">
              <FontAwesomeIcon icon={faBell} /> Notifikasi Kosong.....
            </div>
          )}
        </ul>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStylesFilter}
        className="border-none absolute top-7 overflow-hidden px-5"
      >
        <div className="bg-white rounded-xl">
          <div className="text-right">
            <button
              id="close"
              aria-label="close button"
              className="text-gray-400 p-3"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>
          <ul className="flex flex-col ">
            <li
              className={`px-4 ${
                statusFilter === 'Terbaru' ? 'bg-secondary text-white' : 'hover:bg-gray-200'
              } cursor-pointer border-b border-t py-4    hover:font-bold `}
              onClick={() => {
                closeModal()
                setStatusFilter('Terbaru')
              }}
            >
              <div className="flex justify-between font-[600]">Terbaru</div>
            </li>
            <li
              className={`px-4 ${
                statusFilter === 'Terlama' ? 'bg-secondary text-white' : 'hover:bg-gray-200'
              } cursor-pointer border-t py-4   rounded-b-xl hover:font-bold `}
              onClick={() => {
                closeModal()
                setStatusFilter('Terlama')
              }}
            >
              <div className="flex justify-between font-[600]">Terlama</div>
            </li>
          </ul>
        </div>
      </ReactModal>
    </div>
  )
}

export default Notification
