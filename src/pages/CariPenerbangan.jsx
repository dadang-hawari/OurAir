import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRightArrowLeft,
  faArrowsDownToPeople,
  faArrowsLeftRight,
  faBox,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClock,
  faDollar,
  faIcons,
  faLeftRight,
  faSuitcase,
  faSuitcaseRolling,
  faTimeline,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { customStylesFilter } from '../styles/customStyles'
import { useDispatch, useSelector } from 'react-redux'
import { getFlightByCityorCountry, getFlightsByCity } from '../redux/actions/flightsAction'
import { PenerbanganNotFound } from '../components/CariPenerbangan/PenerbanganNotFound'
import { SkeletonLoading } from '../components/CariPenerbangan/SkeletonLoading'
import Toast from '../components/common/Toast'
import { checkLocationState } from '../utils/checkLocationState'
import { setIdFlight, setJumlahPenumpang } from '../redux/reducers/checkoutReducer'
import { formatTimeToHM, formatTimeToIndonesia } from '../utils/timeFormatter'
import { toast } from 'react-toastify'
import BackToTopButton from '../components/common/BackToTop'
import { DateList } from '../components/CariPenerbangan/DateList'
import { setIsLoading } from '../redux/reducers/flightsReducer'
import { convertDateFormat } from '../utils/convertDateFormat'
import FilterClass from '../components/CariPenerbangan/FilterClass'

export default function CariPenerbangan() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state?.searchValue
  const [activeDetailId, setActiveDetailId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('Sortir Berdasarkan')

  console.log(
    'state?.flightLists',
    useSelector((state) => state?.flightLists)
  )
  const flights = useSelector((state) => state?.flightLists)
  const listFlights = flights?.flightsByCity?.flights
  const flightDetail = flights?.flightDetail
  const totalPages = flightDetail?.totalPages
  console.log('flightDetail', flightDetail)
  const [currentPage, setCurrentPage] = useState(1)
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)
  const kotaKeberangkatan = jadwalPenerbangan?.departureCity
  const kotaTujuan = jadwalPenerbangan?.arrivalCity
  const kotaKeberangkatanCode = jadwalPenerbangan?.departureCityCode
  const kotaTujuanCode = jadwalPenerbangan?.arrivalCityCode
  const tanggalBerangkat = jadwalPenerbangan?.tanggalBerangkatKembali[0]
  const tanggalKembali = jadwalPenerbangan?.tanggalBerangkatKembali[1]
  const jumlahPenumpang = jadwalPenerbangan?.jumlahPenumpang
  const childAndAdult = jumlahPenumpang?.penumpangDewasa + jumlahPenumpang?.penumpangAnak
  const message =
    'Mohon maaf, jumlah kursi di maskapai ini kurang dari jumlah penumpang yang telah dipilih.'
  const toastId = 'toastInfo'
  const toastClass = 'toast-info'
  const isLoading = useSelector((state) => state?.flightLists?.isLoading)
  const dispatch = useDispatch()
  console.log('jadwalPenerbangan', jadwalPenerbangan)
  const [sortedFlights, setSortedFlights] = useState([])

  const kelas = jadwalPenerbangan?.kelas

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`${
            i === currentPage ? 'bg-primary text-white' : 'bg-gray-200'
          } py-2 px-4 rounded-md`}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }
  const getFlights = async () => {
    dispatch(setIsLoading(true))
    const formattedTanggalBerangkat = convertDateFormat(tanggalBerangkat)
    const formattedTanggalKembali = convertDateFormat(tanggalKembali)
    handleFilter(selectedFilter)
    dispatch(
      getFlightByCityorCountry(
        kotaKeberangkatan,
        kotaTujuan,
        kelas?.name,
        formattedTanggalBerangkat,
        formattedTanggalKembali,
        10,
        currentPage
      )
    ).then(() => dispatch(setIsLoading(false)))
    setSortedFlights(listFlights)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const toggleDetailVisibility = (id) => {
    setActiveDetailId((prevId) => (prevId === id ? null : id))
  }

  console.log('listFlights', listFlights)
  console.log('sortedFlights', sortedFlights)

  const handleFilter = (filter = 'Harga Termurah') => {
    closeModal()
    setSelectedFilter(filter)
    setSortedFlights(listFlights) // Create a copy of listFlights

    switch (filter) {
      case 'Harga Termurah':
        setSortedFlights(sortedFlights?.sort((a, b) => a.ticket_price - b.ticket_price))
        break
      case 'Durasi Terpendek':
        setSortedFlights(
          sortedFlights?.sort((a, b) => {
            const durationA =
              (new Date(a.arrival_time) - new Date(a.departure_time)) / (1000 * 60 * 60)
            const durationB =
              (new Date(b.arrival_time) - new Date(b.departure_time)) / (1000 * 60 * 60)
            return durationA - durationB
          })
        )
        break
      case 'Keberangkatan Paling Awal':
        setSortedFlights(
          sortedFlights?.sort((a, b) => new Date(a.departure_time) - new Date(b.departure_time))
        )
        break
      case 'Keberangkatan Paling Akhir':
        setSortedFlights(
          sortedFlights?.sort((a, b) => new Date(b.departure_time) - new Date(a.departure_time))
        )
        break
      case 'Kedatangan Paling Awal':
        setSortedFlights(
          sortedFlights?.sort((a, b) => new Date(a.arrival_time) - new Date(b.arrival_time))
        )
        break
      case 'Kedatangan Paling Akhir':
        setSortedFlights(
          sortedFlights?.sort((a, b) => new Date(b.arrival_time) - new Date(a.arrival_time))
        )
        break
      default:
        break
    }
  }

  const handleClickPilih = (id, availableSeats) => {
    if (childAndAdult > availableSeats) {
      toast(message, {
        toastId,
        className: toastClass,
      })
      return
    }
    dispatch(setIdFlight(id))
    navigate('/checkout-pemesanan', {
      state: { jumlahPenumpang: jadwalPenerbangan?.jumlahPenumpang, flight_id: id },
    })
  }

  useEffect(() => {
    checkLocationState(location, navigate)
    getFlights()
  }, [currentPage, kelas])
  useEffect(() => {
    if (listFlights) {
      setSortedFlights([...listFlights])
    }
  }, [listFlights])
  useEffect(() => {
    if (isLoading && listFlights) {
      setSortedFlights([...listFlights])
      if (sortedFlights) handleFilter(selectedFilter)
    }
  }, [isLoading, listFlights])

  ReactModal.setAppElement('#modal')

  return (
    <>
      <Navbar />
      <div className="max-w-[968px] mx-auto p-4 mt-24 mb-15">
        <h1 className="text-xl font-bold">Cari Penerbangan</h1>
        {/* Tab biru */}
        <div className="text-white bg-accent py-4 mt-3 relative  rounded-xl flex item-center">
          <Link to="/" id="back" aria-label="tombol kembali" className="px-5 flex items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="h-5" />
          </Link>
          <b className="font-[600]">{`${kotaKeberangkatanCode} > ${kotaTujuanCode} ${
            kelas ? '- ' + kelas?.name : ''
          }`}</b>
          <div className="text-right hidden md:block absolute right-2 top-1/2 -translate-y-1/2">
            <button
              className="font-medium px-3 text-white p-2 border-white border-2 rounded-full"
              onClick={openModal}
            >
              <FontAwesomeIcon icon={faArrowRightArrowLeft} className="rotate-90 me-1" /> {}
              {selectedFilter}
            </button>
          </div>
        </div>
        {/* list tanggal */}
        <DateList />

        {/* Filter */}
        <div className="block md:hidden text-right">
          <button
            className="font-medium px-3 text-secondary p-2 border-secondary border rounded-full"
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className="rotate-90 me-1" /> {}
            {selectedFilter}
          </button>

          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customStylesFilter}
            className="border-none absolute top-7 overflow-hidden"
          >
            <div className="bg-white rounded-xl pb-10">
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
                  className={`px-4 cursor-pointer border-b py-4  ${
                    selectedFilter === 'Harga Termurah'
                      ? 'hover:bg-secondary bg-secondary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleFilter('Harga Termurah')}
                >
                  <b>Harga</b> - Termurah
                </li>
                <li
                  className={`px-4 cursor-pointer border-b py-4  ${
                    selectedFilter === 'Durasi Terpendek'
                      ? 'hover:bg-secondary bg-secondary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleFilter('Durasi Terpendek')}
                >
                  <b>Durasi</b> - Terpendek
                </li>
                <li
                  className={`px-4 cursor-pointer border-b py-4  ${
                    selectedFilter === 'Keberangkatan Paling Awal'
                      ? 'hover:bg-secondary bg-secondary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleFilter('Keberangkatan Paling Awal')}
                >
                  <b>Keberangkatan </b> - Paling Awal
                </li>
                <li
                  className={`px-4 cursor-pointer border-b py-4  ${
                    selectedFilter === 'Keberangkatan Paling Akhir'
                      ? 'hover:bg-secondary bg-secondary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleFilter('Keberangkatan Paling Akhir')}
                >
                  <b>Keberangkatan</b> - Paling Akhir
                </li>
                <li
                  className={`px-4 cursor-pointer border-b py-4  ${
                    selectedFilter === 'Kedatangan Paling Awal'
                      ? 'hover:bg-secondary bg-secondary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleFilter('Kedatangan Paling Awal')}
                >
                  <b>Kedatangan </b> - Paling Awal
                </li>
                <li
                  className={`px-4 cursor-pointer border-b py-4  ${
                    selectedFilter === 'Kedatangan Paling Akhir'
                      ? 'hover:bg-secondary bg-secondary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleFilter('Kedatangan Paling Akhir')}
                >
                  <b>Kedatangan</b> - Paling Akhir
                </li>
              </ul>
            </div>
          </ReactModal>
        </div>
        <div className="flex gap-x-8 mt-8">
          {/* Filter */}
          <div className="w-72 flex flex-col gap-y-2 cursor-default shadow-shadow-c-primary p-4 rounded-xl h-fit">
            <FilterClass />
            <h3>
              <FontAwesomeIcon icon={faClock} className=" w-4 text-gray-300" /> Transit
            </h3>
            <h3 className="border-t border-b py-2">
              <FontAwesomeIcon icon={faHeart} className="w-4 text-gray-300" /> Fasilitas
            </h3>
            <h3>
              <FontAwesomeIcon icon={faDollar} className=" w-4 text-gray-300 " /> Harga
            </h3>
          </div>
          {/* Hasil Pencarian */}
          {isLoading ? (
            <div className="w-full">
              <SkeletonLoading />
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 w-full">
              {listFlights?.length > 0 ? (
                sortedFlights?.map((flight, i) => (
                  <div className="border w-full rounded-xl px-3 pt-4 pb-5 h-fit" key={i}>
                    <div className="flex items-center">
                      <img
                        src="/assets/images/brand_airlines.webp"
                        alt="logo_airlines"
                        height="20"
                        width="20"
                      />{' '}
                      <h4 className="font-[600] ms-2 text-xs">
                        {flight?.whomAirplaneFlights?.whomAirlinesAirplanes?.name} -{' '}
                        {flight?.class === 'FIRSTCLASS'
                          ? 'First Class'
                          : flight?.class === 'ECONOMY'
                          ? 'Economy'
                          : 'Business'}
                      </h4>
                    </div>
                    <div className="flex gap-x-10 items-center text-sm">
                      <div className="flex justify-center gap-x-4 w-full p-3">
                        <div>
                          <h4 className="font-bold">{formatTimeToHM(flight?.departure_time)}</h4>
                          <p>{flight?.fromAirport?.cityCode}</p>
                        </div>
                        <div className="text-gray-300 w-full text-center relative">
                          <h4>
                            {' '}
                            {(new Date(flight?.arrival_time) - new Date(flight?.departure_time)) /
                              (1000 * 60 * 60)}
                            h 0m
                          </h4>
                          <hr className="before:content-['>'] before:absolute before:-right-[2px] before:top-[21px] before:-translate-y-1/2" />
                          <p>Langsung</p>
                        </div>
                        <div>
                          <h4 className="font-bold">{formatTimeToHM(flight?.arrival_time)}</h4>
                          <p>{flight?.toAirport?.cityCode}</p>
                        </div>
                        <FontAwesomeIcon
                          icon={faSuitcase}
                          className="text-secondary flex self-center mx-3"
                        />
                      </div>
                      <div className="flex justify-center gap-y-2 flex-col">
                        <b className="text-secondary w-max">
                          IDR {flight?.ticket_price?.toLocaleString('id-ID')}
                        </b>
                        <button
                          className="bg-secondary text-white max-w-[100px] w-full rounded-full py-2"
                          onClick={() => handleClickPilih(flight?.id, flight?.availableSeats)}
                        >
                          Pilih
                        </button>
                        <button
                          className="text-primary font-[600] mt-1"
                          onClick={() => toggleDetailVisibility(flight?.id)}
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`transition-transform duration-300 ${
                              activeDetailId === flight?.id ? 'rotate-0' : 'rotate-180'
                            }`}
                          />{' '}
                          Detail
                        </button>
                      </div>
                    </div>
                    {/* Detail Penerbangan */}
                    <div
                      className={`text-sm px-4 overflow-hidden transition-all duration-500 ${
                        activeDetailId === flight?.id ? 'max-h-screen' : 'max-h-0'
                      }`}
                    >
                      <hr className="my-3" />
                      <h4 className="font-bold text-primary my-2">Detail Penerbangan</h4>
                      <div className="flex justify-between text-sm">
                        <b className="text-base">{formatTimeToHM(flight?.departure_time)}</b>
                        <b className="text-soft-blue">Keberangkatan</b>
                      </div>
                      <p className="my-1">{formatTimeToIndonesia(flight?.departure_time)}</p>
                      <b className="font-[600]">{flight?.fromAirport?.name}</b>
                      <div className="ps-5">
                        <hr className="w-1/2 mx-auto my-4" />
                        <b className="block">
                          {flight?.whomAirplaneFlights?.whomAirlinesAirplanes?.name} -{' '}
                          {flight?.class === 'FIRSTCLASS'
                            ? 'First Class'
                            : flight?.class === 'ECONOMY'
                            ? 'Economy'
                            : 'Business'}
                        </b>

                        <b>{flight?.whomAirplaneFlights?.airplane_code}</b>
                        <b className="block">{flight?.availableSeats} Kursi tersedia </b>

                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faIcons}
                            className="absolute -left-5 top-[3px] text-yellow-400"
                          />
                          <b>Informasi:</b>
                          <ul className="flex flex-col">
                            <li>{flight?.whomAirplaneFlights?.baggage} kg</li>
                            <li>{flight?.whomAirplaneFlights?.cabin_baggage} kg</li>

                            <li>In Flight Entertainment</li>
                          </ul>
                        </div>
                      </div>
                      <hr className="w-1/2 mx-auto my-4" />
                      <div className="flex justify-between text-sm">
                        <b className="text-base">{formatTimeToHM(flight?.arrival_time)}</b>
                        <b className="text-soft-blue">Kedatangan</b>
                      </div>
                      <p className="my-1">{formatTimeToIndonesia(flight?.arrival_time)}</p>
                      <b className="font-[600]">{flight?.toAirport?.name}</b>
                    </div>
                  </div>
                ))
              ) : (
                <PenerbanganNotFound />
              )}

              {listFlights?.length > 0 && (
                <div className={`${totalPages < 2 && 'hidden'} flex justify-center mt-4 gap-2`}>
                  <button
                    onClick={handlePrev}
                    className={` ${
                      currentPage === 1
                        ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                        : 'bg-primary text-white'
                    } py-2 px-4 rounded-md`}
                    disabled={currentPage === 1}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  {renderPageNumbers()}
                  <button
                    onClick={handleNext}
                    className={`${
                      currentPage === totalPages
                        ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                        : 'bg-primary text-white'
                    } py-2 px-4 rounded-md`}
                    disabled={currentPage === totalPages}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <Toast margin="mt-10" autoClose={5000} />
        <BackToTopButton />
      </div>
    </>
  )
}
