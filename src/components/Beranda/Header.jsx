import { Passengers } from './Passenger'
import { Destination } from './Destination'
import { DepartureReturn } from './DepartureReturn'
import { ButtonSearch } from './ButtonSearch'
import { useNavigate } from 'react-router-dom'
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
          src="/assets/images/Group 160.webp"
          alt="Pantai"
          className="w-full h-[362px] xl:h-auto 2xl:max-h-96  object-cover absolute"
        />
        <div className="absolute top-72 max-w-5xl w-11/12 h-fit px-4 pt-4 pb-20 md:p-6 xl:p-8 rounded-xl border bg-white left-1/2 -translate-x-1/2">
          <div>
            <h1 className="font-bold text-xl">
              Pilih Jadwal Penerbangan spesial di{' '}
              <strong className="text-secondary">OurAir!</strong>
            </h1>
          </div>
          <Destination />
          <div className="grid  gap-y-4 mt-6">
            <DepartureReturn />
            <div className="flex gap-x-7 w-full justify-between md:ml-1">
              <div className="text-gray-primary hidden sm:flex gap-x-4 text-sm font-[600] w-16 items-center">
                <img
                  src="assets/images/seat.png"
                  alt="Passenger"
                  className="h-6 w-auto select-none none"
                />
                <span className="font-[600] text-sm">Seat</span>
              </div>

              <Passengers />
            </div>
          </div>
          <ButtonSearch onClick={handleSearch} />
        </div>
      </div>
    </>
  )
}
