import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faChevronDown,
  faChevronRight,
  faIcons,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { data } from 'autoprefixer'
import DatePicker from 'react-multi-date-picker'
import SeatPicker from '../../components/SeatPicker'

export default function CheckoutBiodataPemesan() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const emailnow = useSelector((state) => state?.auth?.userData?.email)
  const jumlahPenumpang = useSelector((state) => state)
  console.log('jumlahPenumpang', jumlahPenumpang)
  ReactModal.setAppElement('#modal')
  const [pemesan, setPemesan] = useState({
    data: {
      namaLengkapPemesan: '',
      namaKeluargaPemesan: '',
      nomorTeleponPemesan: '',
      emailPemesan: '',
    },
  })
  const [useCurrentEmail, setUseCurrentEmail] = useState(false)

  const penumpangSaatIni = 3
  const [penumpang, setPenumpang] = useState([])

  useEffect(() => {
    // Inisialisasi state penumpang berdasarkan jumlah penumpangSaatIni
    setPenumpang(
      Array.from({ length: penumpangSaatIni }, (_, index) => ({
        id: `penumpang ${index + 1}`,
        title: 'Mr.',
        namaLengkap: '',
        namaKeluarga: '',
        tanggalLahir: '',
        kewarganegaraan: '',
        ktpOrPasspor: '',
        negaraPenerbit: 'Singapore', // Misalnya defaultnya Singapore
        berlakuSampai: '',
      }))
    )
  }, [penumpangSaatIni])

  const handlePenumpang = (e, id) => {
    const { name, value } = e.target
    setPenumpang((prevPenumpang) =>
      prevPenumpang.map((penumpang) =>
        penumpang.id === id ? { ...penumpang, [name]: value } : penumpang
      )
    )
  }

  const handleTanggalLahirChange = (date, id) => {
    setPenumpang((prevPenumpang) =>
      prevPenumpang.map((penumpang) =>
        penumpang.id === id ? { ...penumpang, tanggalLahir: date.format('YYYY-MM-DD') } : penumpang
      )
    )
  }

  const handleBerlakuSampaiChange = (date, id) => {
    setPenumpang((prevPenumpang) =>
      prevPenumpang.map((penumpang) =>
        penumpang.id === id ? { ...penumpang, berlakuSampai: date.format('YYYY-MM-DD') } : penumpang
      )
    )
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handlePemesan = (e) => {
    const { name, value } = e.target
    setPemesan((prevPemesan) => ({
      ...prevPemesan,
      data: {
        ...prevPemesan.data,
        [name]: value,
      },
    }))
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
                    <label className="font-bold" htmlFor="namaLengkapPemesan">
                      Nama Lengkap
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nama lengkap"
                      id="namaLengkapPemesan"
                      name="namaLengkapPemesan"
                      value={pemesan.data.namaLengkap}
                      onChange={handlePemesan}
                    />
                  </div>

                  <div>
                    <label className="font-bold" htmlFor="namaKeluarga">
                      Nama Keluarga (opsional)
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nama keluarga"
                      id="namaKeluargaPemesan"
                      name="namaKeluargaPemesan"
                      value={pemesan.data.namaKeluarga}
                      onChange={handlePemesan}
                    />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="nomorTeleponPemesan">
                      Nomor Telepon
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nomor telepon"
                      id="nomorTeleponPemesan"
                      min={0}
                      name="nomorTeleponPemesan"
                      value={pemesan.data.nomorTeleponPemesan}
                      onChange={handlePemesan}
                    />
                  </div>
                  <div>
                    <div className="flex mb-2 justify-between">
                      <p>Gunakan email saat ini?</p>
                      <button
                        onClick={() => setUseCurrentEmail(!useCurrentEmail)}
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
                    <label className="font-bold" htmlFor="emailPemesan">
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
                      id="emailPemesan"
                      name="emailPemesan"
                      readOnly={useCurrentEmail}
                      value={useCurrentEmail ? emailnow : pemesan.data.emailPemesan}
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
                  <div key={penumpangData.id}>
                    <h2 className="bg-gray-700 text-white rounded-t-md p-2 text-[600]">
                      Data Diri {penumpangData.id} - Adult
                    </h2>
                    <div className="w-full p-3 flex flex-col gap-y-4">
                      <div>
                        <label className="font-bold" htmlFor={`title-${penumpangData.id}`}>
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
                            id={`title-${penumpangData.id}`}
                            className="w-full cursor-pointer border outline-none focus:border-secondary rounded-md h-10 appearance-none px-3 mt-1"
                            value={penumpangData.title}
                            onChange={(e) => handlePenumpang(e, penumpangData.id)}
                          >
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`namaLengkap-${penumpangData.id}`}>
                          Nama Lengkap
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan nama lengkap"
                          id={`namaLengkap-${penumpangData.id}`}
                          name="namaLengkap"
                          value={penumpangData.namaLengkap}
                          onChange={(e) => handlePenumpang(e, penumpangData.id)}
                        />
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`namaKeluarga-${penumpangData.id}`}>
                          Nama Keluarga (opsional)
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan nama keluarga"
                          id={`namaKeluarga-${penumpangData.id}`}
                          name="namaKeluarga"
                          value={penumpangData.namaKeluarga}
                          onChange={(e) => handlePenumpang(e, penumpangData.id)}
                        />
                      </div>
                      <div className="relative">
                        <label
                          className="font-bold block"
                          htmlFor={`tanggalLahir-${penumpangData.id}`}
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
                            value={penumpangData.tanggalLahir}
                            onChange={(date) => handleTanggalLahirChange(date, penumpangData.id)}
                            render={
                              <input
                                className="calendar w-full block border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                                id={`tanggalLahir-${penumpangData.id}`}
                                name="tanggalLahir"
                                value={penumpangData.tanggalLahir}
                                readOnly
                              />
                            }
                          />

                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-gray-400 absolute pointer-events-none right-3 -translate-y-1/2 top-1/2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="font-bold"
                          htmlFor={`kewarganegaraan-${penumpangData.id}`}
                        >
                          Kewarganegaraan
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan Kewarganegaraan"
                          id={`kewarganegaraan-${penumpangData.id}`}
                          name="kewarganegaraan"
                          value={penumpangData.kewarganegaraan}
                          onChange={(e) => handlePenumpang(e, penumpangData.id)}
                        />
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`ktpOrPasspor-${penumpangData.id}`}>
                          KTP/Paspor
                          <span className="text-red-500 font-normal" title="Perlu diisi">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                          placeholder="Masukkan KTP/Paspor"
                          id={`ktpOrPasspor-${penumpangData.id}`}
                          name="ktpOrPasspor"
                          value={penumpangData.ktpOrPasspor}
                          onChange={(e) => handlePenumpang(e, penumpangData.id)}
                        />
                      </div>
                      <div>
                        <label className="font-bold" htmlFor={`negaraPenerbit-${penumpangData.id}`}>
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
                            name="negaraPenerbit"
                            id={`negaraPenerbit-${penumpangData.id}`}
                            className="w-full cursor-pointer border outline-none focus:border-secondary rounded-md h-10 appearance-none px-3 mt-1"
                            value={penumpangData.negaraPenerbit}
                            onChange={(e) => handlePenumpang(e, penumpangData.id)}
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
                          htmlFor={`berlakuSampai-${penumpangData.id}`}
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
                            value={penumpangData.berlakuSampai}
                            onChange={(date) => handleBerlakuSampaiChange(date, penumpangData.id)}
                            render={
                              <input
                                className="calendar w-full block border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                                id={`berlakuSampai-${penumpangData.id}`}
                                name="berlakuSampai"
                                value={penumpangData.berlakuSampai}
                                readOnly
                              />
                            }
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
                  Economy - 72 Kursi Tersedia
                </h2>
                <div className="w-full p-3 flex flex-col gap-y-4">
                  <SeatPicker />
                </div>
              </div>
            </div>

            <div className="bg-secondary text-white px-5 my-4 rounded-xl py-4">
              <p className="text-base text-center">Simpan</p>
            </div>
          </div>

          {/* Detail Penerbangan */}
          <div className="w-full md:max-w-[376px] mt-5">
            <div className="w-full">
              <div className="flex justify-between mt-2">
                <h2 className="font-bold text-xl">Detail Penerbangan</h2>
              </div>
              <div className="flex justify-between mt-2">
                <b className="font-bold">19:10</b>
                <b className="text-blue-400 text-xs">Keberangkatan</b>
              </div>
              <p className="my-1">5 Maret 2023</p>
              <b className="font-[600]">Soekarno Hatta - Terminal 1A Domestik</b>
              <div className="text-sm">
                <hr className="w-[95%] mx-auto my-3 " />
                <div className="flex items-center gap-x-2">
                  <FontAwesomeIcon icon={faIcons} className="text-yellow-400" />
                  <div className="w-full">
                    <div className="font-bold">
                      <h4>Jet Air - Economy</h4>
                      <h5>JT- 203</h5>
                    </div>
                    <div>
                      <b>Informasi:</b>
                      <p>Baggage 20 kg</p>
                      <p>Cabin baggage 7kg</p>
                      <p>In Flight Entertainment</p>
                    </div>
                  </div>
                </div>
                <hr className="w-[95%] mx-auto my-3 " />
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-bold">21:10</h3>
                    <b className="text-blue-400">Kedatangan</b>
                  </div>
                  <h4>5 Maret 2023</h4>
                  <h5 className="font-[600]">Melbourne International Airport</h5>
                </div>
                <hr className="w-[95%] mx-auto my-3 " />
                <div className="w-full">
                  <b>Rincian Harga</b>
                  <div className="flex justify-between">
                    <span>2 Orang Dewasa</span>
                    <span>IDR 9.550.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Bayi</span>
                    <span>IDR 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak</span>
                    <span>IDR 300.000</span>
                  </div>
                </div>
                <hr className="w-[95%] mx-auto my-3 " />
                <div className="flex justify-between text-base">
                  <b>Total</b>
                  <b className="text-secondary">IDR 9.850.000</b>
                </div>
              </div>
              <div className="bg-secondary text-white px-5 my-4 rounded-xl py-5">
                <p className="text-base text-center">Lanjut bayar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
