import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faBox,
  faDollar,
  faIcons,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

export default function PilihPenerbangan() {
  const location = useLocation()
  const data = location?.state?.searchValue
  return (
    <>
      <Navbar />
      <div className="max-w-[968px] mx-auto p-4 mt-24">
        <h1 className="text-xl font-bold">Pilih Penerbangan</h1>
        {/* Tab biru */}
        <div className="text-white bg-accent py-3 mt-3  rounded-xl flex item-center">
          <Link
            to="/"
            id="back"
            aria-label="tombol kembali"
            className="px-5 flex items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-5" />
          </Link>
          <b className="font-[600]">{data}</b>
        </div>
        {/* list tanggal */}
        <div className="text-sm flex justify-between my-5 overflow-x-auto">
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
        </div>
        <hr />
        <div className="flex  mt-5">
          {/* Filter */}
          <div className="w-48 flex flex-col gap-y-1 cursor-default shadow-shadow-c-primary p-4 rouned-xl">
            <h2 className="font-[600]">Filter</h2>
            <h3>
              <FontAwesomeIcon icon={faBox} className="mr-1 text-gray-300" />{' '}
              Transit
            </h3>
            <h3 className="border-t border-b py-2">
              <FontAwesomeIcon
                icon={faHeart}
                className="mr-[2px] text-gray-300"
              />{' '}
              Fasilitas
            </h3>
            <h3>
              <FontAwesomeIcon
                icon={faDollar}
                className="ps-1 mr-1 text-gray-300 "
              />{' '}
              Harga
            </h3>
          </div>
          {/* Skeleton Loading */}
          {/* <div className=" animate-pulse"></div> */}
          {/* Hasil Pencarian */}
          <div className="border w-full rounded-xl">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faIcons}
                className="ps-1 mr-1 text-yellow-300 text-xs font-[600] "
              />{' '}
              <h4 className="font-[600]">Jet Air - Economy</h4>
            </div>
            <div className="flext text-sm">
              <div className="flex justify-center">
                <div>
                  <h4 className="font-bold">07:00</h4>
                  <p>JKT</p>
                </div>
                <div className="text-gray-300 w-full text-center relative">
                  <h4>4h 0m</h4>
                  <hr className='before:content-[">"] before:absolute before:-right-[2px] before:top-[21px] before:-translate-y-1/2' />
                  <p>Langsung</p>
                </div>
                <div>
                  <h4 className="font-bold">11:00</h4>
                  <p>MLB</p>
                </div>
              </div>
              <button>Pilih</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
