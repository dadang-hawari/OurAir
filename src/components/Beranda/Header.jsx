import {
  faArrowRightArrowLeft,
  faArrowsLeftRight,
  faArrowsLeftRightToLine,
  faArrowsRotate,
  faArrowsSpin,
  faBusinessTime,
  faCalendarDays,
  faChair,
  faPlaneArrival,
  faPlaneDeparture,
  faPlayCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { faRecycle } from '@fortawesome/free-solid-svg-icons/faRecycle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Calendar } from 'react-multi-date-picker'
import { toast } from 'react-toastify'
import { Passengers } from './Passenger'
import ReactModal from 'react-modal'
import { customStyles } from '../../styles/customStyles'

const Destination = () => {
  const [departureCity, setDepartureCity] = useState('Keberangkatan')
  const [arrivalCity, setArrivalCity] = useState('Tujuan')

  const swapCity = () => {
    if (departureCity === 'Keberangkatan' || arrivalCity === 'Tujuan') {
      toast('Mohon untuk memilih kota tujuan atau keberangkatan', {
        className: 'toast-info',
      })
      return
    }
    setDepartureCity(arrivalCity)
    setArrivalCity(departureCity)
  }
  return (
    <div className="flex my-8 gap-x-8 items-center">
      <div className="text-gray-400 flex gap-x-4 items-center">
        <FontAwesomeIcon icon={faPlaneDeparture} width="20" /> From
      </div>
      <div className="max-w-[300px] w-full">
        <button className="text-left text-18px font-[600]">
          {departureCity}
        </button>
        <hr className="mt-1" />
      </div>
      <button onClick={() => swapCity()}>
        <FontAwesomeIcon icon={faArrowsRotate} className="text-gray-400 h-5" />{' '}
      </button>
      <div className="text-gray-400 flex gap-x-4 items-center">
        <FontAwesomeIcon icon={faPlaneArrival} width="20" /> To
      </div>
      <div className="max-w-[300px] w-full">
        <button className="text-left text-18px font-[600] ">
          {arrivalCity}
        </button>
        <hr className="mt-1" />
      </div>
    </div>
  )
}

const DepartureReturn = () => {
  const [isReturn, setIsReturn] = useState(true)
  const [values, setValues] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflowY = 'hidden'
  }
  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflowY = 'auto'
  }

  const setReturn = () => {
    setIsReturn(!isReturn)
  }

  return (
    <div className="flex gap-x-8 w-full">
      <div className="text-gray-400 flex gap-x-4 items-center">
        <FontAwesomeIcon icon={faCalendarDays} className="h-5" width="20" />{' '}
        Date
      </div>
      <div className="flex gap-x-4 w-full">
        <div>
          <h4>Departure</h4>
          <button className="text-left my-2 text-18px font-[600]">
            1 Maret 2023
          </button>
          <hr className="mt-1" />
        </div>
        <div>
          <div className="flex gap-x-5">
            <h4>Return</h4>
            <button
              onClick={setReturn}
              className={`w-10 h-5 flex items-center rounded-full transition-colors duration-300 cursor-pointer ${
                isReturn ? 'bg-accent' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform  ${
                  isReturn ? 'translate-x-full' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
          <div className="relative">
            <button
              onClick={openModal}
              className="text-left my-2 text-18px font-[600]"
            >
              Pilih Tanggal
            </button>
            <hr className="mt-1" />

            <ReactModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              className="border-none absolute top-7 overflow-hidden"
            >
              <Calendar
                className={isReturn ? 'block' : 'hidden'}
                value={values}
                onChange={setValues}
                range
                numberOfMonths={2}
                showOtherDays
                weekDays={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
              />
            </ReactModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  return (
    <div className="h-86 relative">
      <img
        src="/assets/images/header_background.webp"
        alt="Pantai"
        className="w-full h-86 absolute"
      />
      <div className="absolute top-72 max-w-4xl w-11/12 h-[298px] p-8 rounded-xl border bg-white left-1/2 -translate-x-1/2">
        <h2 className="font-bold text-xl">
          Pilih Jadwal Penerbangan spesial di{' '}
          <span className="text-accent">OurAir!</span>
        </h2>

        <Destination />
        <div className="flex">
          <DepartureReturn />
          <Passengers />
        </div>
      </div>
    </div>
  )
}
