import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faChevronDown,
  faChevronRight,
  faIcons,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { data } from 'autoprefixer'
import DatePicker from 'react-multi-date-picker'
import SeatPicker from '../../components/SeatPicker'
import {
  assignSeatsToPassengers,
  resetSelectedSeats,
  setJumlahPenumpang,
  setPemesan,
  setPenumpang,
  setSelectedSeat,
  setUseCurrentEmail,
  updateBerlakuSampai,
  updatePenumpang,
  updateTanggalLahir,
} from '../../redux/reducers/checkoutReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFlightById, postBooking } from '../../redux/actions/checkoutAction'
import { formatTimeToHM, formatTimeToIndonesia } from '../../utils/timeFormatter'
import { toast } from 'react-toastify'
import Toast from '../../components/common/Toast'

export default function CheckoutBiodataPemesan() {
  const emailnow = useSelector((state) => state?.auth?.userData?.email)
  const flightLists = useSelector((state) => state?.flightLists)
  const flightDetail = flightLists?.flightDetail
  const flightSeats = flightLists?.flightSeats
  const dataCheckout = useSelector((state) => state?.checkout)
  const selectedSeats = dataCheckout?.selectedSeats
  const flight_id = dataCheckout?.idFlight
  const pemesan = dataCheckout?.pemesan
  const penumpang = dataCheckout?.penumpang
  const useCurrentEmail = dataCheckout?.useCurrentEmail
  const seatClass = flightDetail?.class
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const penumpangSaatIni = dataCheckout?.jumlahPenumpang
  const jumlahPenumpang = location?.state?.jumlahPenumpang
  const pajak =
    (penumpangSaatIni?.penumpangAnak + penumpangSaatIni?.penumpangDewasa) *
    flightDetail?.ticket_price *
    0.1

  const hargaTiketAnak = flightDetail?.ticket_price * penumpangSaatIni?.penumpangAnak
  const hargaTiketDewasa = flightDetail?.ticket_price * penumpangSaatIni?.penumpangDewasa
  const jumlahPenumpangAnak = penumpangSaatIni?.penumpangAnak
  const jumlahPenumpangDewasa = penumpangSaatIni?.penumpangDewasa
  const jumlahPenumpangBayi = penumpangSaatIni?.penumpangBayi

  const setDataPenumpang = () => {
    // percabangan if biar inputan nggak kereset jika misalnya tidak ada perubahan penumpang
    if (
      (penumpangSaatIni?.penumpangDewasa === jumlahPenumpang?.penumpangDewasa &&
        penumpangSaatIni?.penumpangAnak === jumlahPenumpang?.penumpangAnak &&
        penumpangSaatIni?.penumpangBayi === jumlahPenumpang?.penumpangBayi) ||
      jumlahPenumpang?.penumpangDewasa === null ||
      jumlahPenumpang?.penumpangDewasa === undefined
    )
      return
    dispatch(setJumlahPenumpang(jumlahPenumpang))
    dispatch(resetSelectedSeats())
    const { penumpangDewasa, penumpangAnak } = jumlahPenumpang ?? {}
    const penumpangBaru = []
    for (let i = 0; i < penumpangDewasa; i++) {
      penumpangBaru.push({
        id: `penumpang ${i + 1} - Dewasa`,
        title: 'Mr',
        fullname: '',
        surname: '',
        birth_date: '',
        nationality: '',
        document: '',
        country_publication: 'Indonesia',
        document_expired: '',
        ticket: { flight_id: flight_id },
        category: 'adult',
        seat_number: '',
      })
    }

    for (let i = 0; i < penumpangAnak; i++) {
      penumpangBaru.push({
        id: `penumpang ${penumpangDewasa + i + 1} - Anak`,
        title: 'Mr.',
        fullname: '',
        surname: '',
        birth_date: '',
        nationality: '',
        document: '',
        country_publication: 'Indonesia',
        document_expired: '',
        ticket: { flight_id: flight_id },
        category: 'child',
        seat_number: '',
      })
    }

    dispatch(setPenumpang(penumpangBaru))
  }

  useEffect(() => {
    // Inisialisasi state penumpang berdasarkan jumlah penumpangSaatIni
    setDataPenumpang()
    dispatch(getFlightById(flight_id))
  }, [penumpangSaatIni])

  const handlePenumpang = (e, id) => {
    const { name, value } = e.target
    dispatch(updatePenumpang({ id, name, value }))
  }

  const handleTanggalLahirChange = (date, id) => {
    dispatch(updateTanggalLahir({ id, date: date.format('YYYY-MM-DD') }))
  }

  const handleBerlakuSampaiChange = (date, id) => {
    dispatch(updateBerlakuSampai({ id, date: date.format('YYYY-MM-DD') }))
  }

  const handlePemesan = (e) => {
    const { name, value } = e.target
    dispatch(setPemesan({ name, value }))
  }

  const handleLanjutBayar = () => {
    console.log('dataCheckout', dataCheckout)
    if (selectedSeats.length < jumlahPenumpangAnak + jumlahPenumpangDewasa) {
      toast(
        `Mohon pastikan agar Anda telah memilih ${
          jumlahPenumpangAnak + jumlahPenumpangDewasa
        } kursi`,
        {
          toastId: 'toastInfo',
          className: 'toast-error',
        }
      )
      return
    }
    dispatch(assignSeatsToPassengers(selectedSeats))
    dispatch(postBooking(navigate))
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl px-5 mx-auto mt-24">
        <div className="text-xl cursor-default text-gray-400 flex items-center gap-x-2">
          <b className="text-black">Isi Data Diri</b>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          <b>Bayar</b>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          <b>Selesai</b>
        </div>
        {/* Alert */}
        <div className="bg-red-primary text-white px-5 my-4 rounded-xl py-3">
          <p className="text-base text-center">Selesaikan dalam 00:15:00</p>
        </div>
        <div className="bg-green-soft text-white px-5 rounded-xl py-3">
          <p className="text-base text-center">Data Anda berhasil tersmipan!</p>
        </div>
        <div className="text-sm mt-4 flex gap-8 flex-col md:flex-row w-full">
          <div className="w-full">
            {/* Isi Data Pemesan */}
            <div className="border rounded-md h-fit p-5 w-full">
              <b className="text-xl mb-3 block">Isi Data Pemesan</b>
              <div className="w-full text-gray-secondary">
                <h2 className="bg-gray-700 text-white rounded-t-md p-2 text-[600]">
                  Data Diri Pemesan
                </h2>
                <div className="w-full p-3 flex flex-col gap-y-4">
                  <div>
                    <label className="font-bold" htmlFor="fullname">
                      Nama Lengkap
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nama lengkap"
                      id="fullname"
                      name="fullname"
                      value={pemesan.data.fullname}
                      onChange={handlePemesan}
                    />
                  </div>

                  <div>
                    <label className="font-bold" htmlFor="surname">
                      Nama Keluarga (opsional)
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nama keluarga"
                      id="surname"
                      name="surname"
                      value={pemesan.data.surname}
                      onChange={handlePemesan}
                    />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="phone_number">
                      Nomor Telepon
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nomor telepon"
                      id="phone_number"
                      min={0}
                      name="phone_number"
                      value={pemesan.data.phone_number}
                      onChange={handlePemesan}
                    />
                  </div>
                  <div>
                    <div className="flex mb-2 justify-between">
                      <p>Gunakan email saat ini?</p>
                      <button
                        onClick={() => dispatch(setUseCurrentEmail(!useCurrentEmail))}
                        id="useCurrentEmail"
                        name="useCurrentEmail"
                        aria-label="Toggle Email Saat Ini"
                        className={`w-10 h-5 flex items-center rounded-full transition-colors duration-300 cursor-pointer ${
                          useCurrentEmail ? 'bg-accent' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform ${
                            useCurrentEmail ? 'translate-x-full' : 'translate-x-0'
                          }`}
                        ></div>
                      </button>
                    </div>
                    <label className="font-bold" htmlFor="email">
                      Email
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className={`w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4 ${
                        useCurrentEmail ? 'cursor-default' : ''
                      }`}
                      placeholder="Contoh: kusuma@gmail.com"
                      id="email"
                      name="email"
                      readOnly={useCurrentEmail}
                      value={useCurrentEmail ? emailnow : pemesan.data.email}
                      onChange={handlePemesan}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Isi Data Penumpang */}
            <div className="border rounded-md h-fit my-8 p-5 w-full">
              <b className="text-xl mb-3 block">Isi Data Penumpang</b>
              <div className="w-full text-gray-secondary">
                {penumpang.map((penumpangData) => (
                  <div key={penumpangData?.id} className="mb-5">
                    <h2 className="bg-gray-700 text-white rounded-t-md p-2 text-[600]">
                      Data Diri {penumpangData?.id}
                    </h2>
                    <div className="w-full p-3 flex flex-col gap-y-4">
                      <div>
                        <label className="font-bold" htmlFor={`title-${penumpangData?.id}`}>
                          Title
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="absolute pointer-events-none text-gray-primary right-2 top-1/2 -translate-y-1/2 z-10"
                          />
                          <select
                            name="title"
                            id={`title-${penumpangData?.id}`}
                            className="w-full cursor-pointer border outline-none focus:border-secondary rounded-md h-10 appearance-none px-3 mt-1"
                            value={penumpangData?.title}
                            onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                          >
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Miss">Miss</option>
                            <option value="Mrs.">Mrs.</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`fullname-${penumpangData?.id}`}>
                          Nama Lengkap
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan nama lengkap"
                          id={`fullname-${penumpangData?.id}`}
                          name="fullname"
                          value={penumpangData?.fullname}
                          onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                        />
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`surname-${penumpangData?.id}`}>
                          Nama Keluarga (opsional)
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan nama keluarga"
                          id={`surname-${penumpangData?.id}`}
                          name="surname"
                          value={penumpangData?.surname}
                          onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                        />
                      </div>
                      <div className="relative">
                        <label
                          className="font-bold block"
                          htmlFor={`birth_date-${penumpangData?.id}`}
                        >
                          Tanggal Lahir
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <DatePicker
                            monthYearSeparator="-"
                            format="YYYY-MM-DD"
                            showOtherDays
                            highlightToday={false}
                            value={penumpangData?.birth_date}
                            onChange={(date) => handleTanggalLahirChange(date, penumpangData?.id)}
                          />
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-gray-400 absolute pointer-events-none right-3 -translate-y-1/2 top-1/2"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`nationality-${penumpangData?.id}`}>
                          Kewarganegaraan
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan Kewarganegaraan"
                          id={`nationality-${penumpangData?.id}`}
                          name="nationality"
                          value={penumpangData?.nationality}
                          onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                        />
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`document-${penumpangData?.id}`}>
                          KTP/Paspor
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan KTP/Paspor"
                          id={`document-${penumpangData?.id}`}
                          name="document"
                          value={penumpangData?.document}
                          onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                        />
                      </div>
                      <div>
                        <label
                          className="font-bold"
                          htmlFor={`country_publication-${penumpangData?.id}`}
                        >
                          Negara Penerbit
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="absolute pointer-events-none text-gray-primary right-2 top-1/2 -translate-y-1/2 z-10"
                          />
                          <select
                            name="country_publication"
                            id={`country_publication-${penumpangData?.id}`}
                            className="w-full cursor-pointer border outline-none focus:border-secondary rounded-md h-10 appearance-none px-3 mt-1"
                            value={penumpangData?.country_publication}
                            onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                          >
                            <option value="Singapore">Singapore</option>
                            <option value="Amerika">Amerika</option>
                            <option value="Indonesia">Indonesia</option>
                          </select>
                        </div>
                      </div>
                      <div className="relative">
                        <label
                          className="font-bold block"
                          htmlFor={`document_expired-${penumpangData?.id}`}
                        >
                          Berlaku
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <DatePicker
                            monthYearSeparator="-"
                            showOtherDays
                            highlightToday={false}
                            format="YYYY-MM-DD"
                            value={penumpangData?.document_expired}
                            onChange={(date) => handleBerlakuSampaiChange(date, penumpangData?.id)}
                          />
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-gray-400 absolute pointer-events-none right-3 -translate-y-1/2 top-1/2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kursi */}
            <div className="border rounded-md h-fit my-8 p-5 w-full">
              <b className="text-xl mb-3 block">Isi Data Penumpang</b>
              <div className="w-full text-gray-secondary">
                <h2 className="bg-gray-700 text-white text-center rounded-t-md p-2 text-[600]">
                  {seatClass === 'FIRSTCLASS'
                    ? 'First Class'
                    : seatClass === 'ECONOMY'
                    ? 'Economy'
                    : 'Business'}{' '}
                  - {flightSeats?.totalAvailableSeats} Kursi Tersedia
                </h2>
                <div className="w-full p-3 flex flex-col gap-y-4">
                  <SeatPicker />
                </div>
              </div>
            </div>
          </div>

          {/* Detail Penerbangan */}
          <div className="w-full md:max-w-[376px] h-fit border p-4 ">
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
                      {seatClass === 'FIRSTCLASS'
                        ? 'First Class'
                        : seatClass === 'ECONOMY'
                        ? 'Economy'
                        : 'Business'}
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
              <button
                onClick={handleLanjutBayar}
                className="bg-secondary text-white text-base text-center px-5 my-4 rounded-xl py-5 w-full"
              >
                Lanjut bayar
              </button>
            </div>
          </div>
        </div>
        <Toast />
      </div>
    </div>
  )
}
