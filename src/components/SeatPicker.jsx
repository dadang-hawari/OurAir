import React, { useState, useEffect } from 'react'
import '../styles/seatpicker.css'
import {
  addSelectedSeat,
  removeSelectedSeat,
  resetSelectedSeats,
  setSelectedSeat,
} from '../redux/reducers/checkoutReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function SeatPicker() {
  const [seats, setSeats] = useState([])
  const selectedSeats = useSelector((state) => state?.checkout?.selectedSeats)
  const dispatch = useDispatch()

  // Jumlah penumpang
  const penumpang = 2
  const namaPenumpang = {
    penumpang1: {
      nama: 'Denis',
    },
    penumpang2: {
      nama: 'Dina',
    },
  }
  // Data kursi dengan struktur baris dan kolom
  const data = {
    seats: [
      [
        { id: '1A', status: 'unavailable' },
        { id: '1B', status: 'available' },
        { id: '1C', status: 'available' },
        { id: '1D', status: 'available' },
        { id: '1E', status: 'unavailable' },
        { id: '1F', status: 'available' },
      ],
      [
        { id: '2A', status: 'available' },
        { id: '2B', status: 'available' },
        { id: '2C', status: 'available' },
        { id: '2D', status: 'available' },
        { id: '2E', status: 'available' },
        { id: '2F', status: 'available' },
      ],
      [
        { id: '3A', status: 'available' },
        { id: '3B', status: 'available' },
        { id: '3C', status: 'available' },
        { id: '3D', status: 'available' },
        { id: '3E', status: 'available' },
        { id: '3F', status: 'available' },
      ],
      [
        { id: '4A', status: 'available' },
        { id: '4B', status: 'available' },
        { id: '4C', status: 'available' },
        { id: '4D', status: 'available' },
        { id: '4E', status: 'available' },
        { id: '4F', status: 'available' },
      ],
    ],
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = data
      setSeats(result.seats)
    }
    fetchData()
  }, [])

  const handleSeatClick = (seatId) => {
    const seat = seats.flat().find((seat) => seat.id === seatId)
    if (seat.status === 'unavailable') return

    if (selectedSeats.includes(seatId)) {
      // Jika kursi sudah dipilih, batalkan pilihan
      dispatch(removeSelectedSeat(seatId))
    } else if (selectedSeats.length < penumpang) {
      // Jika jumlah kursi yang dipilih belum mencapai batas maksimal
      dispatch(addSelectedSeat(seatId))
    } else {
      // Jika jumlah kursi yang dipilih sudah mencapai batas maksimal
      // Batalkan semua kursi yang dipilih sebelumnya dan pilih kursi yang baru
      dispatch(resetSelectedSeats())
      dispatch(setSelectedSeat(seatId))
    }
  }

  return (
    <div className="seat-picker overflow-x-auto">
      <div className="w-full">
        <h2 className="font-[600]">Keterangan</h2>
        <div className="flex items-center">
          <div className="seat  unavailable-info ">X</div>
          <p>Kursi tidak tidak tersedia</p>
        </div>
        <div className="flex items-center">
          <div className="seat cursor-default available"></div>
          <p>Kursi yang dapat dipilih</p>
        </div>
        <div>
          <div className="flex items-center">
            <div className="seat cursor-default selected text-white">P1</div>
            <p>Kursi yang dipilih</p>
          </div>
        </div>
      </div>
      <div className="seat-row flex gap-x-1 items-center w-full">
        <div className="w-full flex gap-x-1 items-center">
          <div className="seat-heading">A</div>
          <div className="seat-heading">B</div>
          <div className="seat-heading">C</div>
        </div>
        <h2 className={' w-10 h-9 mx-1'}></h2>
        <div className="w-full flex gap-x-1 items-center">
          <div className="seat-heading">D</div>
          <div className="seat-heading">E</div>
          <div className="seat-heading">F</div>
        </div>
      </div>
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row flex gap-x-1 items-center">
          {row.map((seat, i) => {
            const seatIndex = selectedSeats.indexOf(seat.id)
            const seatLabel =
              seatIndex >= 0 ? `P${seatIndex + 1}` : seat.status === 'unavailable' ? 'X' : ''
            return (
              <React.Fragment key={seat.id}>
                {' '}
                {/* Add key here */}
                {i === 3 && (
                  <h2
                    key={`row-${rowIndex}-seat-${seat.id}`} // Add unique key here
                    className={
                      'flex items-center justify-center w-4 h-9 mx-1 rounded-xl text-center text-gray-600  bg-gray-100  text-xs'
                    }
                  >
                    {rowIndex + 1}
                  </h2>
                )}
                <div
                  key={seat.id} // Key for the seat
                  className={`seat ${seat.status} ${
                    selectedSeats.includes(seat.id) ? 'selected' : ''
                  }`}
                  onClick={() => handleSeatClick(seat.id)}
                >
                  {seatLabel}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      ))}
    </div>
  )
}
