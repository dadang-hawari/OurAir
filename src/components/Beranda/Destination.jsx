import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightArrowLeft,
  faLocationDot,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { customStylesDestination } from '../../styles/customStyles'
import { setDepartureCity, setArrivalCity } from '../../redux/reducers/jadwalPenerbanganReducer'
import { getAllFlights } from '../../redux/actions/flightsAction'
const SkeletonListBandara = () => (
  <div className="animate-pulse">
    {[...Array(3)].map((_, i) => (
      <React.Fragment key={i}>
        <div className="h-4 w-72 bg-gray-300 rounded-full -4 mt-5"></div>
        <div className="h-4 w-40 bg-gray-300 rounded-full ms-4 mt-4"></div>
      </React.Fragment>
    ))}
  </div>
)

const AirPortList = ({ airports, onCitySelect, selectedCityType }) => {
  const removeDuplicateAirports = (airports) => {
    const seenAirports = new Set()
    return airports?.filter((airport) => {
      const airportName =
        selectedCityType === 'departure' ? airport?.fromAirport?.name : airport?.toAirport?.name
      if (seenAirports.has(airportName)) {
        return false
      } else {
        seenAirports.add(airportName)
        return true
      }
    })
  }

  const sortedAirports = airports?.sort((a, b) =>
    selectedCityType === 'departure'
      ? a?.fromAirport?.name.localeCompare(b.fromAirport?.name)
      : a?.toAirport?.name.localeCompare(b.toAirport?.name)
  )

  const uniqueAirports = removeDuplicateAirports(sortedAirports)

  return uniqueAirports?.length > 0 ? (
    uniqueAirports.map((airport, index) => (
      <div
        key={index}
        onClick={() => onCitySelect(airport)}
        className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-100"
      >
        <FontAwesomeIcon className="text-gray-400" icon={faLocationDot} />
        <div className="ps-3">
          {selectedCityType === 'departure' ? airport?.fromAirport?.name : airport?.toAirport?.name}
          <div className="text-gray-400 text-sm">
            {selectedCityType === 'departure'
              ? airport?.fromAirport?.countryName
              : airport?.toAirport?.countryName}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center p-4 text-gray-500">Bandara atau negara tidak ditemukan</div>
  )
}

export const Destination = () => {
  const dispatch = useDispatch()
  const { departureCity, arrivalCity } = useSelector((state) => state?.jadwalPenerbangan)
  const airports = useSelector((state) => state?.flightLists?.allFlights?.flights)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCityType, setSelectedCityType] = useState('departure')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getAllFlights()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  const handleCitySelect = (airport) => {
    if (selectedCityType === 'departure') {
      dispatch(setDepartureCity(airport?.fromAirport?.name))
    } else {
      dispatch(setArrivalCity(airport?.toAirport?.name))
    }
    closeModal()
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim())
  }

  const openModal = (type) => {
    setSelectedCityType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSearchTerm('')
    setIsModalOpen(false)
  }

  const Close = () => {
    return (
      <div
        className="absolute top-[2px] cursor-pointer pt-2 py-1 z-20 px-[13px] right-0 text-xs text-gray-500"
        onClick={closeModal}
      >
        <FontAwesomeIcon icon={faXmark} className="h-4" />
      </div>
    )
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

  const filteredAirports = airports?.filter((airport) => {
    if (selectedCityType === 'departure') {
      return (
        (airport?.fromAirport?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          airport?.fromAirport?.countryName?.toLowerCase()?.includes(searchTerm?.toLowerCase())) &&
        airport?.fromAirport?.name !== arrivalCity
      )
    } else {
      return (
        (airport?.toAirport?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          airport?.toAirport?.countryName?.toLowerCase()?.includes(searchTerm?.toLowerCase())) &&
        airport?.toAirport?.name !== departureCity
      )
    }
  })

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
          className="w-full cursor-pointer flex-grow"
          onClick={() => openModal('departure')}
          id="keberangkatan"
        >
          <button className="text-center sm:text-left text-sm font-[600] border w-full py-3 ps-5 pr-3">
            {departureCity}
          </button>
        </div>
        <button
          id="swapBtn"
          aria-label="Tukar Kota"
          title="Tukar Kota"
          onClick={swapCities}
          className="bg-softer-blue p-2 w-10 rounded-md sm:absolute mini:translate-x-[unset] sm:left-[50%] sm:-translate-x-1/2"
        >
          <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-gray-primary h-5" />
        </button>
        <div
          className="absolute sm:static bottom-3 sm:hidden left-2 text-gray-primary flex gap-x-4 items-center cursor-pointer w-16"
          onClick={() => openModal('arrival')}
        >
          <FontAwesomeIcon icon={faPlaneArrival} width="20" />
          <span className="font-[600] hidden mini:block">To</span>
        </div>
        <div
          className="w-full cursor-pointer flex-grow"
          onClick={() => openModal('arrival')}
          id="kepulangan"
        >
          <button className="text-center text-sm font-[600] w-full  border py-3 ps-5 pr-3">
            {arrivalCity}
          </button>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStylesDestination}
        className="border-none absolute top-7 w-full"
      >
        <div className="bg-white w-full rounded-md relative pt-3">
          <Close />
          <form onSubmit={(e) => e.preventDefault()} className="p-4 relative">
            <div className="text-gray-400 w-full">
              <input
                type="text"
                id="search"
                placeholder="Masukkan Bandara atau Negara"
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
          <div className="overflow-auto h-64 pb-2">
            <h2 className="font-[600] px-4">Daftar Bandara</h2>
            {isLoading ? (
              <SkeletonListBandara />
            ) : (
              <AirPortList
                airports={filteredAirports}
                onCitySelect={handleCitySelect}
                selectedCityType={selectedCityType}
              />
            )}
          </div>
        </div>
      </ReactModal>
    </div>
  )
}
