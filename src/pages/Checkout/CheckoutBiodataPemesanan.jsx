import { useState } from 'react'
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
  const [statusFilter, setStatusFilter] = useState('Semua Status')
  const [pemesan, setPemesan] = useState({
    data: {
      namaLengkap: '',
      namaKeluarga: '',
      nomorTelepon: '',
      email: '',
    },
  })
  const [penumpang, setPenumpang] = useState({
    data: {
      title: 'Mr.',
      namaLengkap: '',
      namaKeluarga: '',
      tanggalLahir: '',
      kewarganegaraan: '',
      ktpOrPasspor: '',
      negaraPenerbit: '',
      berlakuSampai: '',
    },
  })
  4
  const setDataPenumpang = (isi) => {
    setPenumpang(...data, isi)
  }
  const [namaLengkapPemesan, setNamaLengkapPemesan] = useState('')
  const [nomorTelepon, setNomorTelepon] = useState('')
  const [email, setEmail] = useState('')
  const [useCurrentEmail, setUseCurrentEmail] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const emailnow = useSelector((state) => state?.auth?.userData?.email)
  console.log('data', emailnow)
  ReactModal.setAppElement('#modal')

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
                    <label className="font-bold" htmlFor="namaLengkapPenumpang1">
                      Nama Lengkap
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nama lengkap"
                      id="namaLengkapPenumpang1"
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="titlePenumpang1">
                      Nama Lengkap
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nama lengkap"
                      id="titlePenumpang1"
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
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
                      id="namaKeluarga"
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="namaKeluarga">
                      Nomor Telepon
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nomor telepon"
                      id="namaKeluarga"
                      min={0}
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="flex mb-2 justify-between">
                      <p>Gunakan email saat ini?</p>
                      <button
                        onClick={() => setUseCurrentEmail(!useCurrentEmail)}
                        id="returnBtn"
                        aria-label="Tombol kepulangan"
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
                    <label className="font-bold" htmlFor="namaKeluarga">
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
                      id="namaKeluarga"
                      readOnly={useCurrentEmail}
                      value={useCurrentEmail ? emailnow : email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Isi Data Penumpang */}
            <div className="border rounded-md h-fit my-8 p-5 w-full">
              <b className="text-xl mb-3 block">Isi Data Penumpang</b>
              <div className="w-full text-gray-secondary">
                <h2 className="bg-gray-700 text-white rounded-t-md p-2 text-[600]">
                  Data Diri Penumpang 1 - Adult
                </h2>
                <div className="w-full p-3 flex flex-col gap-y-4">
                  <div>
                    <label className="font-bold" htmlFor="namaLengkap">
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
                        name="title-1"
                        id="title1"
                        onChange={(e) => setDataPenumpang(e.target.value)}
                        className="w-full cursor-pointer border outline-none  focus:border-secondary rounded-md h-10 appearance-none  px-3 mt-1 "
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="namaLengkap">
                      Nama Lengkap
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan nama lengkap"
                      id="namaLengkap"
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
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
                      id="namaKeluarga"
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <label className="font-bold block" htmlFor="tanggalLahir">
                      Tanggal Lahir
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <DatePicker
                        monthYearSeparator="-"
                        showOtherDays
                        format="YYYY-MM-DD"
                        highlightToday={false}
                        render={
                          <input
                            className="calendar w-full  block border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                            id="tanggalLahir"
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
                    <label className="font-bold" htmlFor="kewarganegaraan">
                      Kewarganegaraan
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan Kewarganegaraan"
                      id="kewarganegaraan"
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="ktpOrPasspor">
                      KTP/Paspor
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                      placeholder="Masukkan ktp/passpor"
                      id="ktpOrPasspor"
                      value={namaLengkapPemesan}
                      onChange={(e) => setNamaLengkapPemesan(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="negaraPenerbit">
                      Negara penerbit
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
                        name="title-1"
                        id="title1"
                        value={penumpang.data.title}
                        className="w-full cursor-pointer border outline-none relative appearance-none focus:border-secondary rounded-md h-10 px-3 mt-1 py-4"
                      >
                        <option>Singapore</option>
                        <option>Amerika</option>
                        <option>Indonesia</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative">
                    <label className="font-bold block" htmlFor="berlakuSampai">
                      Berlaku sampai
                      <span className="text-red-500 font-normal" title="Perlu diisi">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <DatePicker
                        monthYearSeparator="-"
                        showOtherDays
                        highlightToday={false}
                        render={
                          <input
                            className="calendar w-full  block border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                            id="berlakuSampai"
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
                <div className="w-[95%]">
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
