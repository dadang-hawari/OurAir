import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faIcons } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

export default function CheckoutBiodataPemesan() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('Semua Status')
  const [familyName, setFamilyName] = useState(false)
  const [isHaveFamilyName, setIsHaveFamilyName] = useState(false)
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
        <div className="bg-red-primary text-white px-5 rounded-xl py-3">
          <p className="text-base text-center">Selesaikan dalam 00:15:00</p>
        </div>
        <div className="text-sm mt-4 flex gap-8 flex-col md:flex-row w-full">
          {/* Isi Data Pemesan */}
          <div className="border rounded-md h-fit p-5 w-full">
            <b className="text-xl mb-3 block">Isi Data Pemesan</b>
            <div className="w-full text-gray-secondary">
              <h2 className="bg-gray-700 text-white rounded-t-md p-2 text-[600]">
                Data Diri Pemesan
              </h2>
              <div className="w-full p-3 flex flex-col gap-y-4">
                <div>
                  <label className="font-bold" for="namaLengkap">
                    Nama Lengkap
                    <span class="text-red-500 font-normal" title="Perlu diisi">
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
                  <label className="font-bold" for="namaKeluarga">
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
                  <label className="font-bold" for="namaKeluarga">
                    Nomor Telepon
                    <span class="text-red-500 font-normal" title="Perlu diisi">
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
                  <label className="font-bold" for="namaKeluarga">
                    Email
                    <span class="text-red-500 font-normal" title="Perlu diisi">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
