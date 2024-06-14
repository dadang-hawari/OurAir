// src/SeatPicker.js
import React, { useState } from 'react'
import './styles/seatpicker.css'

export const SeatPicker = ({ rows, columns }) => {
  const [selectedSeats, setSelectedSeats] = useState([])

  const toggleSeatSelection = (row, col) => {
    const seatId = `${row}-${col}`
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((seat) => seat !== seatId)
        : [...prevSelectedSeats, seatId]
    )
  }

  return (
    <div className="seat-picker">
      {Array.from({ length: 5 }, (_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: 20 }, (_, colIndex) => (
            <div
              key={colIndex}
              className={`seat ${
                selectedSeats.includes(`${rowIndex}-${colIndex}`) ? 'selected' : ''
              }`}
              onClick={() => toggleSeatSelection(rowIndex, colIndex)}
            >
              {String.fromCharCode(65 + rowIndex)}
              {colIndex + 1}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
