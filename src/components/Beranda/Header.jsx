import { Passengers } from './Passenger'
import { Destination } from './Destination'
import { DepartureReturn } from './DepartureReturn'
import { ButtonSearch } from './ButtonSearch'
import { useNavigate } from 'react-router-dom'
import { SeatClass } from './SeatClass'
import Navbar from '../Navbar'

export default function Header() {
  const navigate = useNavigate()
  const handleSearch = () => {
    navigate('/pilih-penerbangan', {
      state: {
        searchValue: 'JKT > MLB - 2 Penumpang - Economy',
      },
    })
  }
  return (
    <>
      <Navbar />
      <div className="h-86 relative">
        <img
          src="/assets/images/header_background.webp"
          alt="Pantai"
          className="w-full h-86 absolute"
        />
        <div className="absolute top-72 max-w-5xl w-11/12 h-fit px-4 pt-4 pb-20 md:p-6 xl:p-8 rounded-xl border bg-white left-1/2 -translate-x-1/2">
          <div>
            <h1 className="font-bold text-xl">
              Pilih Jadwal Penerbangan spesial di <strong className="text-accent">OurAir!</strong>
            </h1>
          </div>
          <Destination />

          <hr className="mb-4" />
          <div className="grid grid-cols-1 gap-y-7">
            <DepartureReturn />
            <div className="flex w-full">
              <Passengers />
              <SeatClass />
            </div>
          </div>
          <ButtonSearch onClick={handleSearch} />
        </div>
      </div>
    </>
  )
}
