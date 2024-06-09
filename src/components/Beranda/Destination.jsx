import {
  faArrowRightArrowLeft,
  faLocationDot,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ReactModal from 'react-modal'
import { customStylesDestination } from '../../styles/customStyles'
import { useDispatch, useSelector } from 'react-redux'
import { setDepartureCity, setArrivalCity } from '../../redux/reducers/jadwalPenerbanganReducer'

const CityList = ({ cities, onCitySelect }) => {
  const sortedCities = cities.sort((a, b) => a.negara.localeCompare(b.negara))

  return sortedCities.map((city, index) => (
    <div
      key={index}
      onClick={() => onCitySelect(city)}
      className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-100"
    >
      <FontAwesomeIcon className="text-gray-400" icon={faLocationDot} />
      <div className="ps-3">
        {city.negara}
        <div className="text-gray-400 text-sm">{city.city}</div>
      </div>
    </div>
  ))
}

export const Destination = () => {
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)
  const departureCity = jadwalPenerbangan?.departureCity
  const arrivalCity = jadwalPenerbangan?.arrivalCity
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCityType, setSelectedCityType] = useState('departure')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  const cities = [
    { negara: 'Malaysia', city: 'Kuala Lumpur (KL)' },
    { negara: 'Indonesia', city: 'Jakarta (JKT)' },
    { negara: 'Brunei', city: 'Bandar Seri Begawan (BSB)' },
  ]

  const handleCitySelect = (city) => {
    if (selectedCityType === 'departure') {
      dispatch(setDepartureCity(city.negara))
    } else {
      dispatch(setArrivalCity(city.negara))
    }
    closeModal()
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const openModal = (type) => {
    setSelectedCityType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const swapCities = () => {
    if (departureCity === 'Tempat Keberangkatan' || arrivalCity === 'Tempat Tujuan') {
      toast('Mohon untuk memilih kota tujuan atau keberangkatan', {
        className: 'toast-info',
        toastId: 'toast-info',
      })
      return
    }
    dispatch(setDepartureCity(arrivalCity))
    dispatch(setArrivalCity(departureCity))
  }

  const filteredCities = cities.filter(
    (city) =>
      city.negara.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (city.city && city.city.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="relative flex flex-col gap-5 text-center sm:text-left my-4 sm:gap-8 sm:flex-row items-center">
      <div
        className="absolute left-2 top-3 sm:static text-gray-primary flex gap-x-4 items-center cursor-pointer w-16"
        onClick={() => openModal('departure')}
      >
        <FontAwesomeIcon icon={faPlaneDeparture} width="20" />
        <span className="text-sm font-[600]">
          <span className="hidden sm:block">Place</span>
          <span className=" hidden mini:block sm:hidden">From</span>
        </span>
      </div>
      <div className="relative flex-col w-full flex gap-5 sm:gap-8 sm:flex-row items-center">
        <div
          className="w-full cursor-pointer  flex-grow"
          onClick={() => openModal('departure')}
          id="keberangkatan"
        >
          <button className="text-center sm:text-left text-sm font-[600] border w-full p-3">
            {departureCity}
          </button>
        </div>

        <button
          id="swapBtn"
          aria-label="Tukar Kota"
          title="Tukar Kota"
          onClick={swapCities}
          className="bg-softer-blue p-2 w-10 rounded-md sm:absolute mini:translate-x-[unset] sm:left-[50%] sm:-translate-x-1/2 "
        >
          <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-gray-primary h-5" />
        </button>

        <div
          className="absolute sm:static bottom-3 sm:hidden left-2  text-gray-primary flex gap-x-4 items-center cursor-pointer w-16"
          onClick={() => openModal('arrival')}
        >
          <FontAwesomeIcon icon={faPlaneArrival} width="20" />
          <span className="font-[600] hidden mini:block ">To</span>
        </div>
        <div
          className="w-full cursor-pointer flex-grow"
          onClick={() => openModal('arrival')}
          id="kepulangan"
        >
          <button className="text-center text-sm font-[600] w-full p-3 border">
            {arrivalCity}
          </button>
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStylesDestination}
        className="border-none absolute top-7 w-full overflow-hidden"
      >
        <div className="bg-white w-full rounded-md relative">
          <form onSubmit={(e) => e.preventDefault()} className="p-4 relative">
            <div className="text-gray-400 w-full">
              <input
                type="text"
                id="search"
                placeholder="Masukkan Kota atau Negara"
                onChange={handleSearchChange}
                value={searchTerm}
                className="w-full h-10 my-2 ps-9 block border text-black rounded-md outline-none focus:border-accent"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="top-1/2 absolute left-5 pointer-events-none -translate-y-1/2 ps-2"
              />
            </div>
          </form>
          <div>
            <h2 className="font-[600] px-4">Daftar Kota</h2>
            <CityList cities={filteredCities} onCitySelect={handleCitySelect} />
          </div>
        </div>
      </ReactModal>
    </div>
  )
}
