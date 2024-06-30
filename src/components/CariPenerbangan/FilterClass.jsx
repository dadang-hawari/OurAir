import React from 'react'
import { setSeatClass } from '../../redux/reducers/jadwalPenerbanganReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function FilterClass() {
  const dispatch = useDispatch()
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)

  const seatClass = jadwalPenerbangan?.kelas

  const handleRadioChange = (event) => {
    // setSeatClass(event.target.value)
    dispatch(setSeatClass({ name: event.target.value }))
  }
  return (
    <div>
      <h2 className="font-[600]">Kelas</h2>

      <label className="flex gap-x-2 cursor-pointer px-2 ">
        <input
          type="radio"
          id="Ekonomi"
          value="Economy"
          checked={seatClass?.name === 'Economy'}
          onChange={handleRadioChange}
        />
        Economy
      </label>
      <label className="flex gap-x-2 cursor-pointer px-2 ">
        <input
          type="radio"
          id="Business"
          value="Business"
          checked={seatClass?.name === 'Business'}
          onChange={handleRadioChange}
        />
        Business
      </label>
      <label className="flex gap-x-2 cursor-pointer px-2 ">
        <input
          type="radio"
          id="FirstClass"
          value="First Class"
          checked={seatClass?.name === 'First Class'}
          onChange={handleRadioChange}
        />
        First Class
      </label>
    </div>
  )
}
