import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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
        <div className="text-sm flex justify-between my-5">
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
          <div className="text-center max-w-24 h-11 px-4 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
            <b>Senin</b>
            <p className="text-gray-400 text-xs">01/03/2023</p>
          </div>
        </div>
        <hr />
        <div className="flex">
          <div className="max-w-48 w-full bg-red-500">
            <h2 className="font-[600]">Filter</h2>
            <h2>Transit</h2>
            <h2>Fasilitas</h2>
            <h2></h2>
          </div>
          {/* Skeleton Loading */}
          <div className=" animate-pulse">
            <div className="w-40 h-2 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </>
  )
}
