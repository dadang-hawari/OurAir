import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { formatTimeToHM, formatTimeToIndonesia } from '../../utils/timeFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faIcons } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar'
import Toast from '../../components/common/Toast'
import { checkLocationState } from '../../utils/checkLocationState'

export default function MenungguPembayaran() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const flightDetail = useSelector((state) => state?.flightLists?.flightDetail)
  const dataCheckout = useSelector((state) => state?.checkout)
  const transaction = dataCheckout?.transaction
  const penumpangSaatIni = dataCheckout?.jumlahPenumpang
  const pajak =
    (penumpangSaatIni?.penumpangAnak + penumpangSaatIni?.penumpangDewasa) *
    flightDetail?.ticket_price *
    0.1

  const hargaTiketAnak = flightDetail?.ticket_price * penumpangSaatIni?.penumpangAnak
  const hargaTiketDewasa = flightDetail?.ticket_price * penumpangSaatIni?.penumpangDewasa
  const jumlahPenumpangAnak = penumpangSaatIni?.penumpangAnak
  const jumlahPenumpangDewasa = penumpangSaatIni?.penumpangDewasa
  const jumlahPenumpangBayi = penumpangSaatIni?.penumpangBayi

  useEffect(() => {
    checkLocationState(location, navigate)
  }, [])
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
          <div className="w-full md:max-w-[376px] mt-5 border p-4 rounded-md">
            <div className="w-full">
              <div className="flex justify-between mt-2">
                <h2 className="font-bold text-xl">Detail Penerbangan</h2>
              </div>
              <div className="flex justify-between mt-2">
                <b className="font-bold">{formatTimeToHM(flightDetail?.departure_time)}</b>
                <b className="text-blue-400">Keberangkatan</b>
              </div>
              <p className="my-1">{formatTimeToIndonesia(flightDetail?.departure_time)}</p>
              <b className="font-[600]">{flightDetail?.fromAirport?.name}</b>
              <div className="text-sm">
                <hr className="w-[95%] mx-auto my-3 " />
                <div className="flex items-center gap-x-2">
                  <FontAwesomeIcon icon={faIcons} className="text-yellow-400" />
                  <div className="w-full">
                    <div className="font-bold">
                      {flightDetail?.whomAirplaneFlights?.whomAirlinesAirplanes?.name} -{' '}
                      {flightDetail?.class === 'FIRSTCLASS' ? 'First Class' : 'Economy'}
                    </div>

                    <b>{flightDetail?.whomAirplaneFlights?.airplane_code}</b>
                    <div>
                      <b>Informasi:</b>
                      <p>{flightDetail?.whomAirplaneFlights?.baggage} kg</p>
                      <p>{flightDetail?.whomAirplaneFlights?.cabin_baggage} kg</p>
                      <p>In Flight Entertainment</p>
                    </div>
                  </div>
                </div>
                <hr className="w-[95%] mx-auto my-3 " />
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{formatTimeToHM(flightDetail?.arrival_time)}</h3>
                    <b className="text-blue-400">Kedatangan</b>
                  </div>
                  <h4>{formatTimeToIndonesia(flightDetail?.arrival_time)}</h4>
                  <h5 className="font-[600]">{flightDetail?.toAirport?.name}</h5>
                </div>
                <hr className="w-[95%] mx-auto my-3 " />
                <div className="w-full">
                  <b>Rincian Harga</b>
                  <div className={`flex justify-between ${!jumlahPenumpangDewasa && 'hidden'}`}>
                    <div className="flex">
                      <span className="w-3">{jumlahPenumpangDewasa} </span> Orang Dewasa{' '}
                    </div>
                    <span>IDR {hargaTiketDewasa.toLocaleString('id-ID')}</span>
                  </div>
                  <div className={`flex justify-between ${!jumlahPenumpangAnak && 'hidden'}`}>
                    <div className="flex">
                      <span className="w-3">{jumlahPenumpangAnak}</span> Orang Anak{' '}
                    </div>
                    <span>IDR {hargaTiketAnak.toLocaleString('id-ID')}</span>
                  </div>
                  <div className={`flex justify-between ${!jumlahPenumpangBayi && 'hidden'}`}>
                    <div className="flex">
                      <span className="w-3">{jumlahPenumpangBayi}</span> Bayi
                    </div>
                    <span>IDR 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak</span>
                    <span>IDR {pajak.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <hr className="w-[95%] mx-auto my-3 " />
                <div className="flex justify-between text-base">
                  <b>Total</b>
                  <b className="text-secondary">
                    IDR {(hargaTiketAnak + hargaTiketDewasa + pajak).toLocaleString('id-ID')}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-center  mt-5 rounded-md ">
            <img
              src="/assets/images/ourair_logo.svg"
              alt="Logo ourair"
              className="w-40 h-auto mx-auto mt-10"
            />
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
          <Toast />
        </div>
      </div>
    </>
  )
}
