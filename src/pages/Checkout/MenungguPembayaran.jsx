import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { formatTimeToHM, formatTimeToIndonesia } from '../../utils/timeFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faIcons } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar'

export default function MenungguPembayaran() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const flightDetail = useSelector((state) => state?.flightLists?.flightDetail)
  const dataCheckout = useSelector((state) => state?.checkout)
  const penumpangSaatIni = dataCheckout?.jumlahPenumpang
  const pajak =
    (penumpangSaatIni?.penumpangAnak + penumpangSaatIni?.penumpangDewasa) *
    flightDetail?.ticket_price *
    0.025

  const hargaTiketAnak = flightDetail?.ticket_price * penumpangSaatIni?.penumpangAnak
  const hargaTiketDewasa = flightDetail?.ticket_price * penumpangSaatIni?.penumpangDewasa
  const jumlahPenumpangAnak = penumpangSaatIni?.penumpangAnak
  const jumlahPenumpangDewasa = penumpangSaatIni?.penumpangDewasa
  const jumlahPenumpangBayi = penumpangSaatIni?.penumpangBayi

  return (
    <>
      <Navbar />
      <div className="max-w-5xl px-5 mx-auto mt-24">
        <div className="text-xl cursor-default text-gray-400 flex items-center gap-x-2">
          <b className="text-black">Isi Data Diri</b>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm text-black" />
          <b className="text-black">Bayar</b>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          <b>Selesai</b>
        </div>
        <div className="text-sm mt-4 flex gap-8 flex-col md:flex-row w-full">
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
          <div>
            <img src="/assets/images/ourair_logo.svg" alt="" className="w-40 ms-5" />
            <div className="text-6xl font-bold text-[#13587B] animate-bounce tracking-widest ">
              ....
            </div>
            <div className=" font-[600] text-[#13587B] ">
              <b>Menunggu pembayaran</b>
              <p>Anda akan diarahkan ke halaman cetak tiket setelah melakukan pembayaran</p>
            </div>
            <a href="https://google.com" target="_blank">
              Silahkan ke link berikut untuk melakukan pembayaran
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
