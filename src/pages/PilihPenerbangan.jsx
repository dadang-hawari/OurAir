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
  faChevronUp,
  faDollar,
  faIcons,
  faLeftRight,
  faSuitcase,
  faSuitcaseRolling,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { customStylesFilter } from '../styles/customStyles'
import { useDispatch, useSelector } from 'react-redux'
import { getFlightByCityorCountry, getFlightsByCity } from '../redux/actions/flightsAction'
import { PenerbanganNotFound } from '../components/HasilCariPenerbangan/PenerbanganNotFound'
import { checkLocationState } from '../utils/checkLocationState'
import { setIdFlight, setJumlahPenumpang } from '../redux/reducers/checkoutReducer'
import { formatTimeToHM, formatTimeToIndonesia } from '../utils/timeFormatter'

export default function PilihPenerbangan() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state?.searchValue
  const [activeDetailId, setActiveDetailId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('Filter')
  const listFlights = useSelector((state) => state?.flightLists?.flightsByCity?.flights)
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)
  const kotaKeberangkatan = jadwalPenerbangan?.departureCity
  const kotaTujuan = jadwalPenerbangan?.arrivalCity
  const tanggalBerangkat = jadwalPenerbangan?.tanggalBerangkatKembali[0]
  const tanggalKembali = jadwalPenerbangan?.tanggalBerangkatKembali[1]

  const kelas = jadwalPenerbangan?.kelas

  useEffect(() => {
    checkLocationState(location, navigate)
    getFlights()
  }, [])

  // Fungsi untuk mengubah format tanggal dari DD MMMM YYYY ke YYYY-MM-DD
  const convertDateFormat = (dateString) => {
    if (dateString === 'Jadwal Kembali' || dateString === 'Tanggal Berangkat') return
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Bulan dimulai dari 0, jadi tambahkan 1
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getFlights = () => {
    const formattedTanggalBerangkat = convertDateFormat(tanggalBerangkat)
    const formattedTanggalKembali = convertDateFormat(tanggalKembali)

    dispatch(
      getFlightByCityorCountry(
        kotaKeberangkatan,
        kotaTujuan,
        kelas?.name,
        formattedTanggalBerangkat,
        formattedTanggalKembali
      )
    ).then(() => {
      setIsLoading(false)
    })
  }
  const tanggalKeberangkatan = jadwalPenerbangan?.tanggalBerangkatKembali[0]
  const tanggalSampai = jadwalPenerbangan?.tanggalBerangkatKembali[1]
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const [filteredFlights, setFilteredFlights] = useState(listFlights)

  const toggleDetailVisibility = (id) => {
    setActiveDetailId((prevId) => (prevId === id ? null : id))
  }

  // Filter flights by lowest price
  const filterByLowestPrice = () => {
    setSelectedFilter('Harga Termurah')
    const sortedFlights = [...listFlights].sort((a, b) => a.ticket_price - b.ticket_price)
    setFilteredFlights(sortedFlights)
    closeModal() // Close the modal after applying filter
  }

  const handleClickPilih = (id) => {
    dispatch(setIdFlight(id))

    navigate('/checkout-pemesanan', {
      state: { jumlahPenumpang: jadwalPenerbangan?.jumlahPenumpang },
    })
  }

  const SkeletonLoading = ({ loop = 10 }) => {
    const skeletons = Array.from({ length: loop })?.map((_, index) => (
      <div key={index} className="border animate-pulse w-full rounded-xl px-3 pt-4 pb-5 h-fit mb-4">
        <div className="flex items-center mt-2">
          <div className="h-4 w-44 bg-gray-300 rounded-xl"></div>
        </div>
        <div className="flex mt-2 gap-x-8">
          <div className="w-full">
            <div className="h-4 w-full bg-gray-300 rounded-xl mt-4 mb-3"></div>
            <div className="h-4 w-full bg-gray-300 rounded-xl"></div>
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded-xl"></div>
            <div className="h-4 w-24 bg-gray-300 my-3 rounded-xl"></div>
            <div className="h-4 w-24 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </div>
    ))

    return <>{skeletons}</>
  }

  return (
    <>
      <Navbar />
      <div className="max-w-[968px] mx-auto p-4 mt-24">
        <h1 className="text-xl font-bold">Cari Penerbangan</h1>
        {/* Tab biru */}
        <div className="text-white bg-accent py-3 mt-3  rounded-xl flex item-center">
          <Link to="/" id="back" aria-label="tombol kembali" className="px-5 flex items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="h-5" />
          </Link>
          <b className="font-[600]">{data}</b>
        </div>
        {/* list tanggal */}
        <div className="text-sm flex justify-between my-5 overflow-x-auto">
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
        </div>
        {/* Filter */}
        <div className="text-right">
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
                  onClick={filterByLowestPrice}
                  className="px-4 cursor-pointer border-b py-4  hover:bg-secondary hover:font-bold hover:text-white"
                >
                  <b>Harga</b> - Termurah
                </li>
                <li className="px-4 cursor-pointer border-b py-4  hover:bg-secondary hover:font-bold hover:text-white">
                  <b>Durasi</b> - Terpendek
                </li>
                <li className="px-4 cursor-pointer border-b py-4  hover:bg-secondary hover:font-bold hover:text-white">
                  <b>Keberangkatan </b> - Paling Awal
                </li>
                <li className="px-4 cursor-pointer border-b py-4  hover:bg-secondary hover:font-bold hover:text-white">
                  <b>Keberangkatan</b> - Paling Akhir
                </li>
              </ul>

              <div className="text-right">
                <button className="my-3 mr-3 font-[600] text-white bg-accent py-3 px-10 rounded-xl">
                  Pilih
                </button>
              </div>
            </div>
          </ReactModal>
        </div>
        <div className="flex gap-x-8 mt-5">
          {/* Filter */}
          <div className="w-48 flex flex-col gap-y-2 cursor-default shadow-shadow-c-primary p-4 rounded-xl h-fit">
            <h2 className="font-[600]">Filter</h2>
            <h3>
              <FontAwesomeIcon icon={faBox} className="mr-1 text-gray-300" /> Transit
            </h3>
            <h3 className="border-t border-b py-2">
              <FontAwesomeIcon icon={faHeart} className="mr-[2px] text-gray-300" /> Fasilitas
            </h3>
            <h3>
              <FontAwesomeIcon icon={faDollar} className="ps-1 mr-1 text-gray-300 " /> Harga
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
                listFlights?.map((flight, i) => (
                  <div className="border w-full rounded-xl px-3 pt-4 pb-5 h-fit" key={i}>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faIcons}
                        className="ps-1 mr-1 text-yellow-300 text-xs font-[600]"
                      />{' '}
                      <h4 className="font-[600]">
                        {flight?.whomAirplaneFlights?.whomAirlinesAirplanes?.name}
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
                          className="bg-secondary text-white max-w-[100px] w-full rounded-full py-1"
                          onClick={() => handleClickPilih(flight?.id)}
                        >
                          Pilih
                        </button>
                        <button
                          className="text-primary font-[600] mt-1"
                          onClick={() => toggleDetailVisibility(flight?.id)}
                        >
                          <FontAwesomeIcon
                            icon={activeDetailId === flight?.id ? faChevronUp : faChevronDown}
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
                          {flight?.class === 'FIRSTCLASS' ? 'First Class' : 'Economy'}
                        </b>

                        <b>{flight?.whomAirplaneFlights?.airplane_code}</b>
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
            </div>
          )}
        </div>
      </div>
    </>
  )
}
