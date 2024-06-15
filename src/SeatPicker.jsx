import React, { useState, useEffect } from 'react'
import './styles/seatpicker.css'

export default function SeatPicker() {
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])

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
        { id: '1A', status: 'unavailable', NamaPenumpang: 'Andreas' },
        { id: '1B', status: 'available', NamaPenumpang: '' },
        { id: '1C', status: 'available', NamaPenumpang: '' },
        { id: '1D', status: 'available', NamaPenumpang: '' },
        { id: '1E', status: 'unavailable', NamaPenumpang: 'Nuri' },
        { id: '1F', status: 'available', NamaPenumpang: '' },
      ],
      [
        { id: '2A', status: 'available', NamaPenumpang: '' },
        { id: '2B', status: 'available', NamaPenumpang: '' },
        { id: '2C', status: 'available', NamaPenumpang: '' },
        { id: '2D', status: 'available', NamaPenumpang: '' },
        { id: '2E', status: 'available', NamaPenumpang: '' },
        { id: '2F', status: 'available', NamaPenumpang: '' },
      ],
      [
        { id: '3A', status: 'available', NamaPenumpang: '' },
        { id: '3B', status: 'available', NamaPenumpang: '' },
        { id: '3C', status: 'available', NamaPenumpang: '' },
        { id: '3D', status: 'available', NamaPenumpang: '' },
        { id: '3E', status: 'available', NamaPenumpang: '' },
        { id: '3F', status: 'available', NamaPenumpang: '' },
      ],
    ],
  }

  useEffect(() => {
    // Simulasi request data dari backend tanpa fetch
    const fetchData = async () => {
      // Simulasi respons dari backend
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
      setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((id) => id !== seatId))
    } else if (selectedSeats.length < penumpang) {
      // Jika jumlah kursi yang dipilih belum mencapai batas maksimal
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId])
    } else {
      // Jika jumlah kursi yang dipilih sudah mencapai batas maksimal
      // Batalkan semua kursi yang dipilih sebelumnya dan pilih kursi yang baru
      setSelectedSeats([seatId])
    }
    console.log('selectedSeats', selectedSeats)
  }

  return (
    <div className="seat-picker overflow-x-auto">
      <div className="flex gap-x-1 items-center w-full justify-between bg-red-500">
        <div className="flex w-full gap-1 justify-center items-center">
          <h2 className="h-10 w-10 flex items-center justify-center bg-red-50 ">A</h2>
          <h2 className="h-10 w-10 flex items-center justify-center ">B</h2>
          <h2 className="h-10 w-10 flex items-center justify-center ">C</h2>
        </div>
        <div className="w-4 h-9 mx-1">d</div>
        <div className="flex w-full gap-1 justify-center items-center">
          <h2 className="h-10 w-10 flex items-center justify-center bg-blue-500">D</h2>
          <h2 className="h-10 w-10 flex items-center justify-center ">E</h2>
          <h2 className="h-10 w-10 flex items-center justify-center ">F</h2>
        </div>
      </div>
      {seats.map((row, rowIndex) => (
        <>
          <div key={rowIndex} className="seat-row flex gap-x-1 items-center bg-red-500">
            {row.map((seat, i) => {
              const seatIndex = selectedSeats.indexOf(seat.id)
              const seatLabel =
                seatIndex >= 0 ? `P${seatIndex + 1}` : seat.status === 'unavailable' ? 'X' : seat.id
              return (
                <>
                  <h2
                    className={
                      i === 3
                        ? 'flex items-center justify-center w-4 h-9 mx-1 rounded-xl text-center text-gray-600  bg-gray-100  text-xs'
                        : 'hidden'
                    }
                  >
                    {rowIndex + 1}
                  </h2>
                  <div
                    key={seat.id}
                    className={`seat ${seat.status} ${
                      selectedSeats.includes(seat.id) ? 'selected' : ''
                    }`}
                    onClick={() => handleSeatClick(seat.id)}
                  >
                    {seatLabel}
                  </div>
                </>
              )
            })}
          </div>
        </>
      ))}
    </div>
  )
}
