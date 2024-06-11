import {
  faArrowLeft,
  faChevronRight,
  faLineChart,
  faLocationDot,
  faLocationPin,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function RiwayatPemesanan() {
  return (
    <div className="max-w-5xl px-5 mx-auto">
      <h1 className="text-xl font-bold">Cari Penerbangan</h1>
      {/* Tab biru */}
      <div className="text-white bg-accent py-3 mt-3  rounded-xl flex item-center">
        <Link to="/" id="back" aria-label="tombol kembali" className="px-5 flex items-center">
          <FontAwesomeIcon icon={faArrowLeft} className="h-5" />
        </Link>
        Beranda
      </div>
      <div className="text-sm mt-4 flex gap-5 flex-col md:flex-row w-full">
        {/* Card */}
        {/* List Booking */}
        <div className="rounded-xl border w-full p-4">
          <span className="bg-[#73CA5C] py-2 px-4 text-white rounded-full">Issued</span>
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

        {/* Details */}
        <div className="w-full max-w-[376px] bg-red-500">
          <div className="flex justify-between">
            <h2 className="font-bold">Detail Pesanan</h2>
            <span className="bg-[#73CA5C] py-2 px-4 text-white rounded-full">Issued</span>
          </div>
          <div>
            Booking Code: <span className="text-accent">6723y2GH3</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
