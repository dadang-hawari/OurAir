import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { formatTimeToHM, formatTimeToIndonesia } from '../../utils/timeFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCircleCheck, faIcons } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar'
import Toast from '../../components/common/Toast'
import { checkLocationState } from '../../utils/checkLocationState'
import { getTransaction, getTransactionById } from '../../redux/actions/paymentHistoryAction'
import { useReactToPrint } from 'react-to-print'
import SkeletonDetailPesanan from '../../components/RiwayatPesanan/SkeletonDetailPesanan'
import { Bounce } from 'react-toastify'
import { setTransactionId } from '../../redux/reducers/checkoutReducer'

export default function MenungguPembayaran() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const riwayat = location
  const waitingTransaction = useSelector((state) => state?.payment?.waitingTransaction)
  const page = useSelector((state) => state?.otp?.page)
  console.log('page', page)

  console.log('riwayat', riwayat)

  const isExpired = (detailPesanan) => {
    return (Date.now() - new Date(detailPesanan?.created_at)) / (1000 * 60 * 60) > 24
  }

  const countPassengersByCategory = (tickets, category) => {
    return tickets?.filter((ticket) => ticket?.whomPassangerTicket?.category === category)?.length
  }

  const detailPesanan = waitingTransaction?.transaction
  const adultCount = countPassengersByCategory(detailPesanan?.tickets, 'adult')
  const childCount = countPassengersByCategory(detailPesanan?.tickets, 'child')

  const dataCheckout = useSelector((state) => state?.checkout)
  const transactionId = dataCheckout?.transactionId
  const transaction = dataCheckout?.transaction?.transaction?.id
  console.log('waitingTransaction', waitingTransaction)

  console.log('detailPesanan', detailPesanan)
  console.log('transaction', transaction)
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'ticket.ourAir',
  })

  // const getTransactionData = () => {
  //   const interval = setInterval(() => {
  //     dispatch(getTransaction()).then(() => {
  //       setIsLoading(false)
  //     })
  //   }, 5000) // Interval 5 detik

  //   return () => clearInterval(interval)
  // }

  useEffect(() => {
    checkLocationState(location, navigate)
    dispatch(getTransaction())
    setTransactionId(transactionId)
    dispatch(getTransactionById(transactionId)).then(() => setIsLoading(false))
  }, [dispatch]) // Pastikan untuk menambahkan dispatch sebagai dependency

  return (
    <>
      <Navbar />
      <div className="max-w-5xl px-5 mx-auto mt-24 mb-10">
        <div className="text-xl cursor-default text-gray-400 flex items-center gap-x-2">
          <b className="text-black">Isi Data Diri</b>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm text-black" />
          <b className="text-black">Bayar</b>
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`text-sm  ${detailPesanan?.status && 'text-black'}`}
          />
          <b className={`${detailPesanan?.status && 'text-black'}`}>Selesai</b>
        </div>
        <div className="text-sm mt-4 flex gap-8 flex-col-reverse md:flex-row w-full">
          {isLoading ? (
            <SkeletonDetailPesanan />
          ) : (
            <div className="w-full md:max-w-[376px] bg-white p-4 rounded-lg border">
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
                      } py-1 px-3 text-white rounded-full h-fit`}
                    >
                      {detailPesanan?.status
                        ? 'Issued'
                        : isExpired(detailPesanan)
                        ? 'Expired'
                        : 'Unpaid'}
                    </span>
                  </div>
                  <div className="mt-2">
                    {formatTimeToIndonesia(detailPesanan?.created_at)}{' '}
                    {formatTimeToHM(detailPesanan?.created_at)}
                  </div>
                  <div className="mb-2 mt-1">
                    Kode Bayar :{' '}
                    <span className="text-secondary font-bold">
                      {detailPesanan?.midtrans_order_id?.slice(9, 50)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <b className="font-bold">
                      {formatTimeToHM(detailPesanan?.flights?.departure_time)}
                    </b>
                    <b className="text-secondary text-xs">Keberangkatan</b>
                  </div>
                  <p className="my-1">
                    {formatTimeToIndonesia(detailPesanan?.flights?.departure_time)}
                  </p>
                  <b className="font-[600]">{detailPesanan?.flights?.fromAirport?.namee}</b>
                  <div className="text-sm">
                    <hr className="w-[95%] mx-auto my-3" />
                    <div className="flex items-center gap-x-2">
                      <div className="w-full">
                        <div className="font-bold">
                          <h4>
                            {
                              detailPesanan?.flights?.whomAirplaneFlights?.whomAirlinesAirplanes
                                ?.name
                            }{' '}
                            -{' '}
                            {detailPesanan?.flights?.class === 'FIRSTCLASS'
                              ? 'First Class'
                              : history?.flights?.class === 'BUSINESS'
                              ? 'Business'
                              : 'Economy'}
                          </h4>
                          <h5>{detailPesanan?.flights?.whomAirplaneFlights?.airplane_code}</h5>
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
                          {formatTimeToHM(detailPesanan?.flights?.arrival_time)}
                        </h3>
                        <b className="text-secondary">Kedatangan</b>
                      </div>
                      <h4>{formatTimeToIndonesia(detailPesanan?.flights?.arrival_time)}</h4>
                      <h5 className="font-[600]">{detailPesanan?.flights?.toAirport?.name}</h5>
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
                        className={`${!detailPesanan?.total_baby && 'hidden'} flex justify-between`}
                      >
                        <span>{detailPesanan?.total_baby} Bayi</span>
                        <span>IDR 0</span>
                      </div>
                      <div
                        className={`${!detailPesanan?.donation && 'hidden'} flex justify-between`}
                      >
                        <span>Donasi</span>
                        <span>IDR {detailPesanan?.donation?.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pajak</span>
                        <span>IDR {detailPesanan?.tax_price?.toLocaleString('id-ID')}</span>
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
            </div>
          )}

          <div className="w-full text-center  mt-5 rounded-md ">
            <img
              src="/assets/images/ourair_logo.svg"
              alt="Logo ourair"
              className="w-40 h-auto mx-auto mt-10"
            />
            {detailPesanan?.status ? (
              <div className="text-center  flex flex-col justify-center items-center ">
                <div className="w-full">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="mt-5 text-8xl mx-auto block text-green-400"
                  />
                  <div className="text-4xl my-4">Terima Kasih!</div>
                  <div className="text-1xl my-4">Pembayaran Sukses...</div>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="text-6xl mt-4 font-bold text-[#13587B] animate-bounce tracking-widest ">
                  ....
                </div>
                <div className="flex flex-col gap-y-5 text-base">
                  <div className=" font-[600] text-[#13587B] ">
                    <b className="text-2xl">Menunggu pembayaran</b>
                  </div>
                  <a>Silahkan tekan tombol berikut untuk menuju ke pembayaran</a>
                  <a
                    href={detailPesanan?.payment_link}
                    target="_blank"
                    className="block bg-secondary w-fit py-3 px-5 mx-auto rounded-md text-white"
                  >
                    Menuju pembayaran
                  </a>
                  <p className="text-sm text-secondary text-[600]">
                    Anda akan diarahkan ke halaman cetak tiket setelah melakukan pembayaran
                  </p>
                </div>
              </div>
            )}
          </div>
          <Toast margin="mt-16" transition={Bounce} />
        </div>
      </div>
    </>
  )
}
