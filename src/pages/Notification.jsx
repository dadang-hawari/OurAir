import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons'
import iconFaFilter from '../../public/assets/images/fi_filter.svg'
import { useEffect } from 'react'
import { getNotification } from '../redux/actions/notificationAction'
import { useDispatch, useSelector } from 'react-redux'

function Header({ title }) {
  return (
    <header className="w-full p-6 shadow-md">
      <div className="max-w-screen-lg mx-auto space-y-4">
        <h1 className="text-xl font-bold">{title || 'Header'}</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-accent rounded-lg text-white px-5 py-3 flex items-center space-x-2 w-full">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="h-4" />
              <span className="text-lg px-3">Beranda</span>
            </Link>
          </div>
          <Link
            to="#"
            className="bg-white text-black border border-blue-500 rounded-3xl py-2 px-3 pr-6 flex items-center"
          >
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
  const notification = useSelector((state) => state?.notification?.notification?.notifications)
  console.log('notification', notification)
  useEffect(() => {
    dispatch(getNotification())
  }, [])

  const Notifications = [
    {
      id: 1,
      title: 'Promosi',
      message: 'Dapatkan Potongan 50% Tiket!',
      details: 'Syarat dan ketentuan berlaku!',
      time: '20 Maret, 14:04',
    },
    {
      id: 2,
      title: 'Notifikasi',
      message:
        'Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!',
      time: '5 Maret, 14:04',
    },
  ]

  return (
    //  PR IF MESSAGE TITLE === BOOKING SUCCESSFULL SAAT USER KLIK ARAHIN KE HALAMAN RIWAYAT PESANAN
    <div className="mt-10 space-y-10">
      <Navbar />
      <Header title="Notifikasi" />
      <div className="max-w-screen-lg mx-auto ">
        <ul className="space-y-4">
          {notification?.map((notification) => (
            <li key={notification.id} className="w-full border-b last:border-b-0">
              <div className="flex justify-between  p-4 hover:bg-gray-50 items-center">
                <div className="flex items-center gap-x-5 flex-grow w-full">
                  <FontAwesomeIcon
                    icon={faBell}
                    className="h-5 text-white self-center  bg-accent rounded-full  p-1"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-400">{notification.title}</h2>
                    <p className="text-black">{notification.message}</p>
                    {/* {notification.details && (
                      <p className="text-gray-400">{notification.details}</p>
                    )} */}
                  </div>
                </div>
                <span className="text-sm text-gray-500 mb-6">{notification.created_at}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Notification
