import React from 'react'
import { setSeatClass } from '../../redux/reducers/jadwalPenerbanganReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function FilterClass() {
  const dispatch = useDispatch()
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)

  const seatClass = jadwalPenerbangan?.kelas

  const handleRadioChange = (event) => {
    dispatch(setSeatClass({ name: event.target.value }))
  }
  return (
    <div className=" w-full sm:w-72 flex-col  sm:flex-col gap-y-2 cursor-default shadow-shadow-c-primary p-4 rounded-xl h-fit">
      <div className="flex gap-x-2">
        <img src="assets/images/seat.png" alt="Class" className="h-5 w-auto select-none none" />
        <h2 className="font-[600]">Kelas</h2>
      </div>
      <div className="flex sm:flex-col mt-2 flex-wrap">
        <label className="flex gap-x-2 items-center  cursor-pointer px-2 py-[2px] ">
          <input
            type="radio"
            id="Ekonomi"
            value="Economy"
            className="h-4 w-4"
            checked={seatClass?.name === 'Economy'}
            onChange={handleRadioChange}
          />
          Economy
        </label>
        <label className="flex gap-x-2 items-center  cursor-pointer px-2 py-[2px] ">
          <input
            type="radio"
            id="Business"
            value="Business"
            className="h-4 w-4"
            checked={seatClass?.name === 'Business'}
            onChange={handleRadioChange}
          />
          Business
        </label>
        <label className="flex gap-x-2 items-center  cursor-pointer px-2 py-[2px] ">
          <input
            type="radio"
            id="FirstClass"
            value="First Class"
            className="h-4 w-4"
            checked={seatClass?.name === 'First Class'}
            onChange={handleRadioChange}
          />
          First Class
        </label>
      </div>
    </div>
  )
}
