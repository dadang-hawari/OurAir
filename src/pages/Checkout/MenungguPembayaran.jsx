import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { formatTimeToHM, formatTimeToIndonesia } from '../../utils/timeFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCircleCheck, faIcons } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar'
import Toast from '../../components/common/Toast'
import { checkLocationState } from '../../utils/checkLocationState'
import { getTransaction } from '../../redux/actions/paymentHistoryAction'
import { useReactToPrint } from 'react-to-print'
import SkeletonDetailPesanan from '../../components/RiwayatPesanan/SkeletonDetailPesanan'

export default function MenungguPembayaran() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  const paymentHistory = useSelector((state) => state?.payment?.paymentHistory?.transaction)
  console.log('paymentHistory', paymentHistory)
  const sortPaymentHistory = [...(paymentHistory || [])].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )
  const countPassengersByCategory = (tickets, category) => {
    return tickets?.filter((ticket) => ticket?.whomPassangerTicket?.category === category)?.length
  }

  const detailPesanan = paymentHistory?.length > 0 ? sortPaymentHistory[0] : null
  const adultCount = countPassengersByCategory(detailPesanan?.tickets, 'adult')
  const childCount = countPassengersByCategory(detailPesanan?.tickets, 'child')

  const dataCheckout = useSelector((state) => state?.checkout)
  const transaction = dataCheckout?.transaction

  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'ticket.ourAir',
  })
  const isExpired = (detailPesanan) => {
    return (Date.now() - new Date(detailPesanan?.created_at)) / (1000 * 60 * 60) > 24
  }

  const getTransactionData = () => {
    const interval = setInterval(() => {
      dispatch(getTransaction()).then(() => {
        setIsLoading(false)
      })
    }, 5000) // Interval 5 detik

    return () => clearInterval(interval)
  }

  useEffect(() => {
    checkLocationState(location, navigate)
    getTransactionData()
    // Membersihkan interval ketika komponen di-unmount
  }, [dispatch]) // Pastikan untuk menambahkan dispatch sebagai dependency

  return (
    <>
      <Navbar />
      <div className="max-w-5xl px-5 mx-auto mt-24 mb-10">
        <div className="text-xl cursor-default text-gray-400 flex items-center gap-x-2">
          <b className="text-black">Isi Data Diri</b>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm text-black" />
          <b className="text-black">Bayar</b>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          <b>Selesai</b>
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
                      } py-1 px-3 text-white rounded-full`}
                    >
                      {detailPesanan?.status
                        ? 'Issued'
                        : isExpired(detailPesanan)
                        ? 'Expired'
                        : 'Unpaid'}
                    </span>
                  </div>
                  <div className="my-2">
                    Kode Pemesanan:{' '}
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
                  onClick={() => alert(detailPesanan?.payment_link)}
                  className="mt-3 text-xl font-[600] bg-red-primary text-white rounded-md w-full h-[62px]"
                >
                  Lanjut Bayar
                </button>
              )}
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
                    href={transaction?.payment_link}
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
          <Toast />
        </div>
      </div>
    </>
  )
}
