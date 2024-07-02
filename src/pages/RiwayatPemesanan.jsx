import {
  faArrowLeft,
  faCheck,
  faChevronDown,
  faChevronRight,
  faFilter,
  faIcons,
  faLineChart,
  faLocationDot,
  faLocationPin,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useState, useRef, useEffect } from 'react'
import ReactModal from 'react-modal'
import { customStyles, customStylesFilter } from '../styles/customStyles'
import { useDispatch, useSelector } from 'react-redux'
import { getTransaction, getTransactionById } from '../redux/actions/paymentHistoryAction'
import { formatTimeToHM, formatTimeToIndonesia } from '../utils/timeFormatter'
import SkeletonDetailPesanan from '../components/RiwayatPesanan/SkeletonDetailPesanan'
import DirectionArrow from '../components/RiwayatPesanan/DirectionArrow'
import SkeletonListPesanan from '../components/RiwayatPesanan/SkeletonListPesanan'
import { ToastContainer } from 'react-toastify'
import { setTransactionId } from '../redux/reducers/checkoutReducer'
import { setPage } from '../redux/reducers/otpReducers'
export default function RiwayatPemesanan() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('Semua Status')
  const paymentHistory = useSelector((state) => state?.payment?.paymentHistory?.transaction)
  const [historyIndex, setHistoryIndex] = useState(0)
  const [filteredHistory, setFilteredHistory] = useState([])
  const detailPesanan = filteredHistory?.length > 0 ? filteredHistory[historyIndex] : null
  const [isLoading, setIsLoading] = useState(true)
  const isLoggedin = useSelector((state) => state?.auth?.isLoggedin)
  const detailRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const setDetail = (index) => {
    setHistoryIndex(index)
    detailRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const countPassengersByCategory = (tickets, category) => {
    return tickets?.filter((ticket) => ticket?.whomPassangerTicket?.category === category)?.length
  }

  const checkIsUserLoggedIn = () => {
    if (!isLoggedin) {
      navigate('/login', {
        state: {
          error: 'Maaf anda tidak mempunyai akses ke halaman ini, silahkan login terlebih dahulu',
        },
      })
      return
    }
    dispatch(getTransaction()).then(() => {
      setIsLoading(false)
    })
  }

  const adultCount = countPassengersByCategory(detailPesanan?.tickets, 'adult')
  const childCount = countPassengersByCategory(detailPesanan?.tickets, 'child')
  useEffect(() => {
    checkIsUserLoggedIn()
  }, [])
  useEffect(() => {
    // Filter paymentHistory based on search input and status filter
    const filtered = paymentHistory?.filter((history) => {
      const matchesSearch =
        history?.midtrans_order_id?.toLowerCase().includes(search.toLowerCase()) ||
        history?.flights?.fromAirport?.cityName?.toLowerCase().includes(search?.toLocaleLowerCase())

      const matchesStatus =
        statusFilter === 'Semua Status' ||
        (statusFilter === 'Sudah Dibayar' && history?.status) ||
        (statusFilter === 'Belum Dibayar' && !history?.status && !isExpired(history)) ||
        (statusFilter === 'Expired' && !history?.status && isExpired(history))

      return matchesSearch && matchesStatus
    })

    setFilteredHistory(filtered)
  }, [search, paymentHistory, statusFilter])

  ReactModal.setAppElement('#modal')

  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'ticket.ourAir',
  })

  const isExpired = (detailPesanan) => {
    return (Date.now() - new Date(detailPesanan?.created_at)) / (1000 * 60 * 60) > 24
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleLanjutBayar = (id) => {
    dispatch(setPage('riwayat'))
    dispatch(setTransactionId(id))
    navigate('/menunggu-pembayaran')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl px-5 mx-auto mt-24">
        <h1 className="text-xl font-bold">Riwayat Pesanan</h1>
        {/* Tab biru */}
        <div className="text-white bg-accent py-3 mt-3 relative rounded-xl flex item-center">
          <Link to="/" id="back" aria-label="tombol kembali" className="px-5 flex items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="h-5" />
          </Link>
          Beranda
          <div className="absolute top-1/2 -translate-y-1/2 right-3">
            <button
              onClick={openModal}
              className="border-2 border-white rounded-md p-1 flex gap-x-1 items-center px-2"
            >
              {statusFilter}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        </div>

        <div className="text-sm mt-4 flex gap-8 flex-col md:flex-row w-full">
          <div className="w-full">
            <form className="my-3 relative text-base" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={search}
                className="w-full h-10 border text rounded-md outline-none focus:border-secondary ps-8"
                placeholder="Cari Nomor Penerbangan"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 pointer-events-none text-gray-400 top-1/2 -translate-y-1/2"
              />
            </form>
            {/* List Booking */}

            {isLoading ? (
              <SkeletonListPesanan />
            ) : filteredHistory?.length > 0 ? (
              filteredHistory?.map((history, i) => (
                <div
                  key={i}
                  onClick={() => setDetail(i)}
                  id="listPesanan"
                  className={`rounded-xl mb-4 border h-fit w-full p-4 cursor-pointer hover:border-secondary ${
                    i === historyIndex && 'border-secondary'
                  }`}
                >
                  <span
                    className={`${
                      history?.status
                        ? 'bg-green-soft'
                        : isExpired(history)
                        ? 'bg-gray-400'
                        : 'bg-red-primary'
                    } py-1 px-3 text-white rounded-full`}
                  >
                    {/* <span className="bg-gray-primary py-1 px-3 text-white rounded-full">
                      Expired
                    </span> */}

                    {history?.status ? 'Issued' : isExpired(history) ? 'Expired' : 'Unpaid'}
                  </span>
                  <div className="flex gap-x-5 my-4 justify-between w-full md:max-w-[468px] items-center">
                    <div className="flex gap-x-2 justify-center w-fit">
                      <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                      <div>
                        <h2 className="text-sm font-bold">
                          {history?.flights?.fromAirport?.cityName}
                        </h2>
                        <div className="text-xs">
                          <h3 className="w-max my-[3px]">
                            {history?.flights
                              ? formatTimeToIndonesia(history?.flights?.departure_time)
                              : 'N/A'}
                          </h3>
                          <h3>{formatTimeToHM(history?.flights?.departure_time)}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="w-full text-center -mt-4">
                      <h2 className="text-gray-600 text-xs pb-1 font-[600]">
                        {history?.flights
                          ? (new Date(history?.flights?.arrival_time) -
                              new Date(history?.flights?.departure_time)) /
                            (1000 * 60 * 60)
                          : 'N/A'}
                        h 0m
                      </h2>
                      <div className="w-full relative">
                        <DirectionArrow />
                      </div>
                    </div>
                    <div className="flex gap-x-2 justify-center w-fit">
                      <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                      <div>
                        <h2 className="text-sm font-bold">
                          {history?.flights ? history?.flights?.toAirport?.cityName : 'N/A'}
                        </h2>
                        <div className="text-xs">
                          <h3 className="w-max my-[3px]">
                            {history?.flights
                              ? formatTimeToIndonesia(history?.flights?.arrival_time)
                              : 'N/A'}
                          </h3>
                          <h3>
                            {history?.flights
                              ? formatTimeToHM(history?.flights?.arrival_time)
                              : 'N/A'}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs">
                      <b>Kode Pemesanan:</b>
                      <p className="text-xs">{history?.midtrans_order_id?.slice(9, 50)}</p>
                    </div>
                    <div className="text-xs">
                      <b>Kelas:</b>
                      <p className="text-xs">
                        {history?.flights?.class === 'FIRSTCLASS'
                          ? 'First Class'
                          : history?.flights?.class === 'BUSINESS'
                          ? 'Business'
                          : 'Economy'}
                      </p>
                    </div>
                    <h3 className="text-primary font-bold">
                      IDR {history?.total_price?.toLocaleString('id-ID')}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div
                className={`text-center my-10 ${paymentHistory?.length === 0 ? 'hidden' : 'block'}`}
              >
                <div className="font-[600] text-sm text-center mb-5 text-secondary">
                  <div className="text-5xl">
                    <FontAwesomeIcon icon={faSearch} className="text-7xl" />
                    ... not found
                  </div>
                  <h5 className="text-black mt-10 text-xl">Hasil tidak ditemukan</h5>
                </div>
              </div>
            )}
          </div>
          {/* Detail Pesanan */}
          {isLoading ? (
            <SkeletonDetailPesanan />
          ) : (
            <div
              id="detailPesanan"
              ref={detailRef}
              className={`${
                paymentHistory?.length === 0 ? 'hidden' : 'block'
              } w-full md:max-w-[376px] `}
            >
              {/* Detail Pesanan */}
              {filteredHistory?.length === 0 ? (
                <SkeletonDetailPesanan />
              ) : detailPesanan?.midtrans_order_id ? (
                <div className="w-full md:max-w-[376px] bg-white p-4 rounded-lg shadow-md">
                  <div ref={printRef} className="p-4">
                    <div className="w-full">
                      <div className="flex justify-between mt-2">
                        <h2 className="font-bold text-xl">Detail Pesanan</h2>
                        <span
                          className={`${
                            detailPesanan?.status
                              ? 'bg-[#73CA5C]'
                              : isExpired(detailPesanan)
                              ? 'bg-gray-400'
                              : 'bg-red-primary'
                          } py-1 px-3 text-white rounded-full`}
                        >
                          {detailPesanan?.status
                            ? 'Issued'
                            : isExpired(detailPesanan)
                            ? 'Expired'
                            : 'Unpaid'}
                        </span>
                      </div>
                      <div>
                        {formatTimeToIndonesia(detailPesanan?.created_at)}{' '}
                        {formatTimeToHM(detailPesanan?.created_at)}
                      </div>
                      <div className="my-2">
                        Kode Pemesanan:{' '}
                        <span className="text-secondary font-bold">
                          {detailPesanan?.midtrans_order_id?.slice(9, 50)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <b className="font-bold">
                          {detailPesanan?.flights?.departure_time
                            ? formatTimeToHM(detailPesanan?.flights?.departure_time)
                            : 'N/A'}
                        </b>
                        <b className="text-secondary text-xs">Keberangkatan</b>
                      </div>
                      <p className="my-1">
                        {detailPesanan?.flights?.departure_time
                          ? formatTimeToIndonesia(detailPesanan?.flights?.departure_time)
                          : 'N/A'}
                      </p>
                      <b className="font-[600]">
                        {detailPesanan?.flights ? detailPesanan?.flights?.fromAirport?.name : 'N/A'}
                      </b>
                      <div className="text-sm">
                        <hr className="w-[95%] mx-auto my-3" />
                        <div className="flex items-center gap-x-2">
                          <div className="w-full">
                            <div className="font-bold">
                              <h4>
                                {detailPesanan?.flights
                                  ? detailPesanan?.flights?.whomAirplaneFlights
                                      ?.whomAirlinesAirplanes?.name
                                  : 'N/A'}{' '}
                                -{' '}
                                {detailPesanan?.flights?.class === 'FIRSTCLASS'
                                  ? 'First Class'
                                  : history?.flights?.class === 'BUSINESS'
                                  ? 'Business'
                                  : 'Economy'}
                              </h4>
                              <h5>
                                {detailPesanan?.flights
                                  ? detailPesanan?.flights?.whomAirplaneFlights?.airplane_code
                                  : 'N/A'}
                              </h5>
                            </div>
                            <div>
                              <b>Informasi:</b>
                              {detailPesanan?.tickets?.map((penumpang, i) => (
                                <div key={i}>
                                  <p className="text-secondary font-[600]">
                                    Penumpang {i + 1} : {penumpang?.whomPassangerTicket?.title}{' '}
                                    {penumpang?.whomPassangerTicket?.fullname}
                                  </p>
                                  <p>KURSI : {penumpang?.whomPassangerTicket?.seat_number}</p>
                                  <p>ID: {penumpang?.passanger_id}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <hr className="w-[95%] mx-auto my-3" />
                        <div>
                          <div className="flex justify-between">
                            <h3 className="font-bold">
                              {detailPesanan?.flights
                                ? formatTimeToHM(detailPesanan?.flights?.arrival_time)
                                : 'N/A'}
                            </h3>
                            <b className="text-secondary">Kedatangan</b>
                          </div>
                          <h4>
                            {detailPesanan?.flights
                              ? formatTimeToIndonesia(detailPesanan?.flights?.arrival_time)
                              : 'N/A'}
                          </h4>
                          <h5 className="font-[600]">
                            {detailPesanan?.flights
                              ? detailPesanan?.flights?.toAirport?.name
                              : 'N/A'}
                          </h5>
                        </div>
                        <hr className="w-[95%] mx-auto my-3" />
                        <div className="w-full">
                          <b>Rincian Harga</b>
                          <div className="flex justify-between">
                            <span>{adultCount} Orang Dewasa</span>
                            <span>
                              IDR{' '}
                              {(
                                detailPesanan?.adult_price /
                                (detailPesanan?.tickets?.length / adultCount)
                              )?.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className={`${!childCount && 'hidden'} flex justify-between`}>
                            <span>{childCount} Orang Anak</span>
                            <span>
                              IDR{' '}
                              {(
                                detailPesanan?.adult_price /
                                (detailPesanan?.tickets?.length / childCount)
                              )?.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <div
                            className={`${
                              !detailPesanan?.total_baby && 'hidden'
                            } flex justify-between`}
                          >
                            <span>{detailPesanan?.total_baby} Bayi</span>
                            <span>IDR 0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pajak</span>
                            <span>IDR {detailPesanan?.tax_price?.toLocaleString('id-ID')}</span>
                          </div>
                          <div
                            className={`${
                              !detailPesanan?.donation && 'hidden'
                            } flex justify-between`}
                          >
                            <span>Donasi</span>
                            <span>IDR {detailPesanan?.donation?.toLocaleString('id-ID')}</span>
                          </div>
                        </div>
                        <hr className="w-[95%] mx-auto my-3" />
                        <div className="flex justify-between text-base">
                          <b>Total</b>
                          <b className="text-secondary">
                            IDR {detailPesanan?.total_price?.toLocaleString('id-ID')}
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>

                  {detailPesanan?.status ? (
                    <button
                      onClick={handlePrint}
                      className="mt-3 text-xl font-[600] bg-secondary hover:bg-blue-600 text-white rounded-md w-full h-[62px]"
                    >
                      Cetak Tiket
                    </button>
                  ) : isExpired(detailPesanan) ? (
                    <button className="mt-3 text-xl font-[600] bg-gray-400 cursor-default text-white rounded-md w-full h-[62px]">
                      Expired
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLanjutBayar(detailPesanan?.id)}
                      className="mt-3 text-xl font-[600] bg-red-primary text-white rounded-md w-full h-[62px]"
                    >
                      Lanjut Bayar
                    </button>
                  )}
                </div>
              ) : (
                <SkeletonDetailPesanan />
              )}

              {/* Unpaid */}
            </div>
          )}
        </div>
      </div>
      <div className={`${paymentHistory?.length === 0 ? 'block' : 'hidden'}  text-center my-5`}>
        <img
          src="/assets/images/riwayat-pesanan/empty.webp"
          alt="Riwayat Pesanan Kosong"
          width="204"
          height="208"
          className="mx-auto mb-3"
        />
        <div className="font-[600] text-sm text-center mb-5">
          <h5 className="text-secondary">Oops! Riwayat Pesanan Kosong!</h5>
          <h5>Anda belum melakukan pemesanan penerbangan</h5>
        </div>
        <Link
          to="/"
          className="w-full max-w-[375px] block mx-auto rounded-xl py-3 font-[600] bg-secondary text-white "
        >
          Cari Penerbangan
        </Link>
      </div>
      <ToastContainer />

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
              className="px-4 cursor-pointer border-b border-t py-4  hover:bg-secondary hover:font-bold hover:text-white"
              onClick={() => setStatusFilter('Semua Status')}
            >
              <div className="flex justify-between font-[600]">
                Semua Status
                <span className="border-2 border-gray-300 rounded-full h-7 w-7 flex items-center justify-center text-green-500">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${statusFilter === 'Semua Status' ? 'block' : 'hidden'}`}
                  />
                </span>
              </div>
            </li>
            <li
              className="px-4 cursor-pointer border-b py-4  hover:bg-secondary hover:font-bold hover:text-white"
              onClick={() => setStatusFilter('Sudah Dibayar')}
            >
              <div className="flex justify-between font-[600]">
                Sudah Dibayar
                <span className="border-2 border-gray-300 rounded-full h-7 w-7 flex items-center justify-center text-green-500">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${statusFilter === 'Sudah Dibayar' ? 'block' : 'hidden'}`}
                  />
                </span>
              </div>
            </li>
            <li
              className="px-4 cursor-pointer border-b py-4  hover:bg-secondary hover:font-bold hover:text-white"
              onClick={() => setStatusFilter('Belum Dibayar')}
            >
              <div className="flex justify-between font-[600]">
                Belum Dibayar
                <span className="border-2 border-gray-300 rounded-full h-7 w-7 flex items-center justify-center text-green-500">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${statusFilter === 'Belum Dibayar' ? 'block' : 'hidden'}`}
                  />
                </span>
              </div>
            </li>
            <li
              className="px-4 cursor-pointer border-b py-4  hover:bg-secondary hover:font-bold hover:text-white"
              onClick={() => setStatusFilter('Expired')}
            >
              <div className="flex justify-between font-[600]">
                Expired
                <span className="border-2 border-gray-300 rounded-full h-7 w-7 flex items-center justify-center text-green-500">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${statusFilter === 'Expired' ? 'block' : 'hidden'}`}
                  />
                </span>
              </div>
            </li>
          </ul>
        </div>
      </ReactModal>
    </>
  )
}
