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
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useState, useRef } from 'react'
import ReactModal from 'react-modal'
import { customStyles, customStylesFilter } from '../styles/customStyles'
export default function RiwayatPemesanan() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('Semua Status')

  ReactModal.setAppElement('#modal')

  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'ticket.ourAir',
  })

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const DirectionArrow = () => {
    return (
      <svg
        viewBox="0 0 164 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" w-[98.9%] absolute top-[-5px] "
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M164 3C164 3.27614 163.776 3.5 163.5 3.5H0V2.5H163.5C163.776 2.5 164 2.72386 164 3Z"
          fill="#151515"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M161.825 0.641565C161.636 0.452812 161.33 0.452812 161.142 0.641565C160.953 0.830318 160.953 1.13635 161.142 1.3251L162.8 2.98333L161.142 4.64157C160.953 4.83032 160.953 5.13635 161.142 5.3251C161.33 5.51386 161.636 5.51386 161.825 5.3251L163.825 3.3251C164.014 3.13635 164.014 2.83032 163.825 2.64157L161.825 0.641565Z"
          fill="#151515"
        />
      </svg>
    )
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
          {/* Card */}
          {/* List Booking */}

          <div className="w-full">
            <form className="my-3 relative text-base">
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
            {/* Sudah dibayar */}
            <div className="rounded-xl mb-4 border h-fit w-full p-4 cursor-pointer hover:border-secondary">
              <span className="bg-green-soft py-1 px-3 text-white rounded-full">Issued</span>
              <div className="flex gap-x-5 my-4 justify-between w-full md:max-w-[468px] items-center">
                <div className="flex gap-x-2 justify-center w-fit">
                  <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                  <div>
                    <h2 className="text-sm font-bold">Jakarta</h2>
                    <div className="text-xs">
                      <h3 className="w-max my-[3px]">5 Maret 2023</h3>
                      <h3>19:10</h3>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center -mt-4">
                  <h2 className="text-gray-600 text-xs pb-1 font-[600]">4h 0m</h2>
                  <div className="w-full relative">
                    <DirectionArrow />
                  </div>
                </div>
                <div className="flex gap-x-2 justify-center w-fit">
                  <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                  <div>
                    <h2 className="text-sm font-bold">Jakarta</h2>
                    <div className="text-xs">
                      <h3 className="w-max my-[3px]">5 Maret 2023</h3>
                      <h3>19:10</h3>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs">
                  <b>Kode Pemesanan:</b>
                  <p className="text-xs">6723y2GHK</p>
                </div>
                <div className="text-xs">
                  <b>Kelas:</b>
                  <p className="text-xs">Economy</p>
                </div>
                <h3 className="text-primary font-bold">IDR 9.850.000</h3>
              </div>
            </div>
            {/* Belum dibayar */}
            <div className="rounded-xl border h-fit w-full p-4 cursor-pointer hover:border-secondary">
              <span className="bg-red-primary py-1 px-3 text-white rounded-full">Unpaid</span>
              <div className="flex gap-x-5 my-4 justify-between w-full md:max-w-[468px] items-center">
                <div className="flex gap-x-2 justify-center w-fit">
                  <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                  <div>
                    <h2 className="text-sm font-bold">Jakarta</h2>
                    <div className="text-xs">
                      <h3 className="w-max my-[3px]">5 Maret 2023</h3>
                      <h3>19:10</h3>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center -mt-4">
                  <h2 className="text-gray-600 text-xs pb-1 font-[600]">4h 0m</h2>
                  <div className="w-full relative">
                    <DirectionArrow />
                  </div>
                </div>
                <div className="flex gap-x-2 justify-center w-fit">
                  <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                  <div>
                    <h2 className="text-sm font-bold">Jakarta</h2>
                    <div className="text-xs">
                      <h3 className="w-max my-[3px]">5 Maret 2023</h3>
                      <h3>19:10</h3>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs">
                  <b>Kode Pemesanan:</b>
                  <p className="text-xs">6723y2GHK</p>
                </div>
                <div className="text-xs">
                  <b>Kelas:</b>
                  <p className="text-xs">Economy</p>
                </div>
                <h3 className="text-primary font-bold">IDR 9.850.000</h3>
              </div>
            </div>
            {/* Dibatalkan */}
            <div className="rounded-xl border h-fit w-full p-4 cursor-pointer mt-5 hover:border-secondary">
              <span className="bg-gray-primary py-1 px-3 text-white rounded-full">Cancelled</span>
              <div className="flex gap-x-5 my-4 justify-between w-full md:max-w-[468px] items-center">
                <div className="flex gap-x-2 justify-center w-fit">
                  <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                  <div>
                    <h2 className="text-sm font-bold">Jakarta</h2>
                    <div className="text-xs">
                      <h3 className="w-max my-[3px]">5 Maret 2023</h3>
                      <h3>19:10</h3>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center -mt-4">
                  <h2 className="text-gray-600 text-xs pb-1 font-[600]">4h 0m</h2>
                  <div className="w-full relative">
                    <DirectionArrow />
                  </div>
                </div>
                <div className="flex gap-x-2 justify-center w-fit">
                  <FontAwesomeIcon icon={faLocationDot} className="text-gray-primary pt-1" />
                  <div>
                    <h2 className="text-sm font-bold">Jakarta</h2>
                    <div className="text-xs">
                      <h3 className="w-max my-[3px]">5 Maret 2023</h3>
                      <h3>19:10</h3>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs">
                  <b>Kode Pemesanan:</b>
                  <p className="text-xs">6723y2GHK</p>
                </div>
                <div className="text-xs">
                  <b>Kelas:</b>
                  <p className="text-xs">Economy</p>
                </div>
                <h3 className="text-primary font-bold">IDR 9.850.000</h3>
              </div>
            </div>
          </div>

          {/* Detail Pesanan */}
          <div className="w-full md:max-w-[376px]">
            {/* Detail Pesanan */}
            <div className="w-full md:max-w-[376px] bg-white p-4 rounded-lg shadow-md">
              <div ref={printRef} className="p-4">
                <div className="w-full">
                  <div className="flex justify-between mt-2">
                    <h2 className="font-bold text-xl">Detail Pesanan</h2>
                    <span className="bg-[#73CA5C] py-1 px-3 text-white rounded-full">Issued</span>
                  </div>
                  <div className="my-2">
                    Booking Code: <span className="text-secondary font-bold">6723y2GH3</span>
                  </div>
                  <div className="flex justify-between">
                    <b className="font-bold">19:10</b>
                    <b className="text-secondary text-xs">Keberangkatan</b>
                  </div>
                  <p className="my-1">5 Maret 2023</p>
                  <b className="font-[600]">Soekarno Hatta - Terminal 1A Domestik</b>
                  <div className="text-sm">
                    <hr className="w-[95%] mx-auto my-3" />
                    <div className="flex items-center gap-x-2">
                      <div className="w-full">
                        <div className="font-bold">
                          <h4>Jet Air - Economy</h4>
                          <h5>JT-203</h5>
                        </div>
                        <div>
                          <b>Informasi:</b>
                          <p className="text-secondary font-[600]">Penumpang 1: Mr. Harr</p>
                          <p>ID: 12344</p>
                          <p className="text-secondary font-[600]">Penumpang 2: Miss her</p>
                          <p>ID: 12341243423</p>
                        </div>
                      </div>
                    </div>
                    <hr className="w-[95%] mx-auto my-3" />
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-bold">21:10</h3>
                        <b className="text-secondary">Kedatangan</b>
                      </div>
                      <h4>5 Maret 2023</h4>
                      <h5 className="font-[600]">Melbourne International Airport</h5>
                    </div>
                    <hr className="w-[95%] mx-auto my-3" />
                    <div className="w-[95%]">
                      <b>Rincian Harga</b>
                      <div className="flex justify-between">
                        <span>2 Orang Dewasa</span>
                        <span>IDR 9.550.000</span>
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
                    <hr className="w-[95%] mx-auto my-3" />
                    <div className="flex justify-between text-base">
                      <b>Total</b>
                      <b className="text-secondary">IDR 9.850.000</b>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="mt-3 text-xl font-[600] bg-secondary hover:bg-blue-600 text-white rounded-md w-full h-[62px]"
              >
                Cetak Tiket
              </button>
            </div>
            {/* Unpaid */}
            <div className="w-full mt-5">
              <div className="flex justify-between">
                <h2 className="font-bold">Detail Pesanan</h2>
                <span className="bg-red-primary py-1 px-3 text-white rounded-full">Unpaid</span>
              </div>
              <div className="my-2">
                Booking Code: <span className="text-secondary font-bold">6723y2GH3</span>
              </div>
              <div className="flex justify-between">
                <b className="font-bold">19:10</b>
                <b className="text-secondary text-xs">Keberangkatan</b>
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
                      <p className="text-secondary font-[600]">Penumpang 1: Mr. Harr</p>
                      <p>ID: 12344</p>
                      <p className="text-secondary font-[600]">Penumpang 2: Miss her</p>
                      <p>ID: 12341243423</p>
                    </div>
                  </div>
                </div>
                <hr className="w-[95%] mx-auto my-3 " />
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-bold">21:10</h3>
                    <b className="text-secondary">Kedatangan</b>
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
                <button className="mt-3 text-xl font-[600] bg-red-primary text-white rounded-md w-full h-[62px]">
                  Lanjut Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              onClick={() => setStatusFilter('Dibatalkan')}
            >
              <div className="flex justify-between font-[600]">
                Dibatalkan
                <span className="border-2 border-gray-300 rounded-full h-7 w-7 flex items-center justify-center text-green-500">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${statusFilter === 'Dibatalkan' ? 'block' : 'hidden'}`}
                  />
                </span>
              </div>
            </li>
          </ul>

          <div className="text-right">
            <button
              className="my-3 mr-3 font-[600] text-white bg-accent py-3 px-10 rounded-xl"
              onClick={closeModal}
            >
              Pilih
            </button>
          </div>
        </div>
      </ReactModal>

      <div className="text-center my-5">
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
    </>
  )
}
