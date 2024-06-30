import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBell, faEyeDropperEmpty, faMessage } from '@fortawesome/free-solid-svg-icons'
import iconFaFilter from '../../public/assets/images/fi_filter.svg'
import { useEffect } from 'react'
import { getNotification, getNotificationById, readAllNotification } from '../redux/actions/notificationAction'
import { useDispatch, useSelector } from 'react-redux'
import { formatTimeToHM, formatTimeToIndonesia } from '../utils/timeFormatter'

function Header({ title }) {
  return (
    <header className="w-full px-4 pt-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-xl font-bold">{title || 'Header'}</h1>
        <div className="flex items-center space-x-4 relative">
          <div className="bg-accent rounded-lg text-white px-5 py-3 flex items-center space-x-2 w-full">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="h-4" />
              <span className="text-lg px-3">Beranda</span>
            </Link>
          </div>
          <Link to="#" className="absolute  right-4 border border-white text-white rounded-3xl py-2 px-3 pr-6 flex items-center">
            <img src={iconFaFilter} alt="faFilter" className="px-1" />
            Filter
          </Link>
        </div>
      </div>
    </header>
  )
}

const Notification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notification = useSelector((state) => state?.notification?.notification?.notifications)
  console.log('notification', notification)
  useEffect(() => {
    dispatch(getNotification()).then(() => {
      dispatch(readAllNotification(navigate))
    })
  }, [])

  const handleNotificationClick = (id) => {
    dispatch(getNotificationById(id))
    dispatch(getNotification(navigate))
  }

  return (
    //  PR IF MESSAGE TITLE === BOOKING SUCCESSFULL SAAT USER KLIK ARAHIN KE HALAMAN RIWAYAT PESANAN
    <div className="mt-16">
      <Navbar />
      <Header title="Notifikasi" />
      <div className="max-w-3xl mx-auto ">
        <ul>
          {notification?.length > 0 ? (
            notification?.map((notification, i) => (
              <>
                <li key={i} className={`w-full border-b  last:border-b-0 ${notification?.is_read ? 'cursor-default' : 'bg-gray-100 cursor-pointer'} `} onClick={() => handleNotificationClick(notification?.id)}>
                  <div className="flex justify-between   p-4 items-center">
                    <div className="flex items-center gap-x-5 flex-grow w-full ">
                      <FontAwesomeIcon icon={faBell} className="h-5 text-white self-center  bg-accent rounded-full  p-1" />
                      <div>
                        <h2 className="text-gray-400">{notification?.title}</h2>
                        <p className="text-black">{notification?.message}</p>
                        <Link to={notification?.link} target="_blank" className={`${notification?.link ? '' : 'hidden'} text-xs text-blue-400`}>
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
              </>
            ))
          ) : (
            <div className="text-center text-secondary text-xl mt-10">
              <FontAwesomeIcon icon={faBell} /> Notifikasi Kosong.....
            </div>
          )}
        </ul>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Notification
