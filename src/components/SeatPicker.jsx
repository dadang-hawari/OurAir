import React, { useEffect } from 'react'
import '../styles/seatpicker.css'
import {
  addSelectedSeat,
  removeSelectedSeat,
  resetSelectedSeats,
  setSelectedSeat,
} from '../redux/reducers/checkoutReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function SeatPicker() {
  const selectedSeats = useSelector((state) => state?.checkout?.selectedSeats)
  const dispatch = useDispatch()
  const flightDetail = useSelector((state) => state?.flightLists?.flightSeats)
  const availableSeats = flightDetail?.seats
  const dataCheckout = useSelector((state) => state?.checkout)
  const pemesan = dataCheckout?.penumpang
  const jumlahPenumpangAnak = dataCheckout?.jumlahPenumpang?.penumpangAnak
  const jumlahPenumpangDewasa = dataCheckout?.jumlahPenumpang?.penumpangDewasa
  const penumpang = jumlahPenumpangAnak + jumlahPenumpangDewasa
  console.log('flightDetail', flightDetail)

  const handleSeatClick = (seatId) => {
    const seat = availableSeats.flat().find((seat) => seat?.seatNumber === seatId)
    if (seat.isBooked) return

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
    console.log('pemesan', pemesan)
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
      {availableSeats?.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row flex gap-x-1 items-center">
          {row.map((seat, i) => {
            const seatIndex = selectedSeats.indexOf(seat.seatNumber)
            const seatLabel = seatIndex >= 0 ? `P${seatIndex + 1}` : seat.isBooked ? 'X' : ''
            return (
              <React.Fragment key={seat.seatNumber}>
                {' '}
                {/* Add key here */}
                {i === 3 && (
                  <h2
                    key={`row-${rowIndex}-seat-${seat.seatNumber}`} // Add unique key here
                    className={
                      'flex items-center justify-center w-4 h-9 mx-1 rounded-xl text-center text-gray-600  bg-gray-100  text-xs'
                    }
                  >
                    {rowIndex + 1}
                  </h2>
                )}
                <div
                  key={seat.seatNumber} // Key for the seat
                  className={`seat ${seat.isBooked === false ? 'available' : 'unavailable'} ${
                    selectedSeats.includes(seat.seatNumber) ? 'selected' : ''
                  }`}
                  onClick={() => handleSeatClick(seat.seatNumber)}
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
