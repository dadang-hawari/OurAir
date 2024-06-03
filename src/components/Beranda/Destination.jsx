import {
  faArrowsRotate,
  faPlaneArrival,
  faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const Destination = () => {
  const [departureCity, setDepartureCity] = useState('Jakarta')
  const [arrivalCity, setArrivalCity] = useState('Melbourne')

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
        <button className="text-left text-16px font-[600]">
          {departureCity}
        </button>
        <hr className="mt-1" />
      </div>
      <button onClick={() => swapCity()}>
        <FontAwesomeIcon icon={faArrowsRotate} className="text-gray-400 h-5" />
      </button>
      <div className="text-gray-400 flex gap-x-4 items-center">
        <FontAwesomeIcon icon={faPlaneArrival} width="20" /> To
      </div>
      <div className="max-w-[300px] w-full">
        <button className="text-left text-16px font-[600] ">
          {arrivalCity}
        </button>
        <hr className="mt-1" />
      </div>
    </div>
  )
}
