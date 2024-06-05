import { Passengers } from './Passenger'
import { Destination } from './Destination'
import { DepartureReturn } from './DepartureReturn'
import { ButtonSearch } from './ButtonSearch'
import { useNavigate } from 'react-router-dom'
import { SeatClass } from './SeatClass'

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
    <div className="h-86 relative">
      <img
        src="/assets/images/header_background.webp"
        alt="Pantai"
        className="w-full h-86 absolute"
      />
      <div className="absolute top-72 max-w-4xl w-11/12 h-[298px] p-8 rounded-xl border bg-white left-1/2 -translate-x-1/2">
        <h2 className="font-bold text-xl">
          Pilih Jadwal Penerbangan spesial di{' '}
          <span className="text-accent">OurAir!</span>
        </h2>
        <Destination />

        <div className="flex">
          <DepartureReturn />
          <Passengers />
          <SeatClass />
        </div>
        <ButtonSearch onClick={handleSearch} />
      </div>
    </div>
  )
}
