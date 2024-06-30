import React from 'react'
import { Passengers } from './Passenger'
import { Destination } from './Destination'
import { DepartureReturn } from './DepartureReturn'
import { ButtonSearch } from './ButtonSearch'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function CardHeader() {
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)
  const kotaKeberangkatan = jadwalPenerbangan?.departureCity
  const kotaTujuan = jadwalPenerbangan?.arrivalCity
  const navigate = useNavigate()
  const handleSearch = () => {
    if (kotaKeberangkatan.length === 0 || kotaKeberangkatan === 'Bandara Keberangkatan' || kotaTujuan.length === 0 || kotaTujuan === 'Bandara Tujuan') {
      toast('Mohon untuk memilih kota tujuan atau keberangkatan', {
        className: 'toast-info',
        toastId: 'toastInfo',
      })
      return
    }
    navigate('/cari-penerbangan')
  }
  return (
    <>
      <div>
        <h1 className="font-bold text-xl">
          Pilih Jadwal Penerbangan spesial di <strong className="text-secondary">OurAir!</strong>
        </h1>
      </div>
      <Destination />
      <div className="grid  gap-5 mt-6">
        <DepartureReturn />
        <div className="flex gap-x-7 w-full justify-between md:ml-1">
          <div className="text-gray-primary hidden sm:flex gap-x-4 text-sm font-[600] w-16 items-center">
            <img src="assets/images/seat.png" alt="Passenger" className="h-6 w-auto select-none none" />
            <span className="font-[600] text-sm">Seat</span>
          </div>

          <Passengers />
        </div>
      </div>
      <ButtonSearch onClick={handleSearch} />
    </>
  )
}
