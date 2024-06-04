import {
  faArrowsRotate,
  faPlaneArrival,
  faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { customStyles } from '../../styles/customStyles'
import ReactModal from 'react-modal'

export const Destination = () => {
  const [departureCity, setDepartureCity] = useState('Jakarta')
  const [arrivalCity, setArrivalCity] = useState('Melbourne')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
    // document.body.style.overflowY = 'hidden'
  }
  const closeModal = () => {
    setIsModalOpen(false)
    // document.body.style.overflowY = 'auto'
  }

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
      <div className="text-gray-primary flex gap-x-4 items-center">
        <FontAwesomeIcon icon={faPlaneDeparture} width="20" /> From
      </div>
      <div className="max-w-[300px] w-full cursor-pointer" onClick={openModal}>
        <button className="text-left text-18px font-[600]">
          {departureCity}
        </button>
        <hr className="mt-1" />
      </div>
      <button onClick={() => swapCity()}>
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className="text-gray-primary h-5"
        />
      </button>
      <div
        className="text-gray-primary flex gap-x-4 items-center"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faPlaneArrival} width="20" /> To
      </div>
      <div className="max-w-[300px] w-full cursor-pointer">
        <button className="text-left text-18px font-[600] ">
          {arrivalCity}
        </button>
        <hr className="mt-1" />
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="border-none absolute top-7 overflow-hidden"
      >
        <div className="bg-white">ini adalah kontentnya</div>
      </ReactModal>
    </div>
  )
}
