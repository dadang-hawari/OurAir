import { useState } from 'react'
import ReactModal from 'react-modal'
import { customStyles } from '../../styles/customStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPerson,
  faChild,
  faBaby,
  faMinus,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { SeatClass } from './SeatClass'

export const Passengers = () => {
  const [isModalOpenPassenger, setIsModalOpenPassenger] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [tempAdults, setTempAdults] = useState(adults)
  const [tempChildren, setTempChildren] = useState(children)
  const [tempInfants, setTempInfants] = useState(infants)

  const openModalPassenger = () => {
    setIsModalOpenPassenger(true)
  }

  const closeModalPassenger = () => {
    setIsModalOpenPassenger(false)
  }

  const handleIncrement = (setter, tempSetter, value) => {
    if (value < 9) tempSetter(value + 1)
  }

  const handleDecrement = (setter, tempSetter, value) => {
    if (value > 0) tempSetter(value - 1)
  }

  const confirmPassenger = () => {
    setAdults(tempAdults)
    setChildren(tempChildren)
    setInfants(tempInfants)
    closeModalPassenger()
  }

  return (
    <div className="flex flex-col sm:flex-row gap-x-4 w-full sm:ms-[6px] ">
      <ReactModal
        isOpen={isModalOpenPassenger}
        onRequestClose={closeModalPassenger}
        style={customStyles}
        className="border-none relative px-6"
      >
        <div className="text-center bg-white px-4 pb-4 pt-8 rounded-md relative">
          <div className="absolute top-2 right-2 cursor-pointer" onClick={closeModalPassenger}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>

          <div className="flex flex-wrap justify-center">
            <div className="w-full">
              <hr className="mt-2 " />
              <div className="flex items-center justify-between mt-2">
                <span className="text-16px font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faPerson} /> Dewasa
                </span>
                <div className="flex gap-x-2 items-center">
                  <button
                    onClick={() => handleDecrement(setAdults, setTempAdults, tempAdults)}
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="" icon={faMinus} />
                  </button>
                  <span className="px-3 border py-[2px] w-12 rounded-sm text-center">
                    {tempAdults}
                  </span>
                  <button
                    onClick={() => handleIncrement(setAdults, setTempAdults, tempAdults)}
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="text-blue-600" icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="text-gray-400 text-left ml-5">(12 tahun keatas)</div>
              <hr className="mt-4" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between mt-2 w-full">
                <span className="text-16px font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faChild} /> Anak
                </span>
                <div className="flex gap-x-2 items-center">
                  <button
                    onClick={() => handleDecrement(setChildren, setTempChildren, tempChildren)}
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="px-3 border py-[2px] w-12 rounded-sm text-center">
                    {tempChildren}
                  </span>
                  <button
                    onClick={() => handleIncrement(setChildren, setTempChildren, tempChildren)}
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="text-blue-600" icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="text-gray-400 text-left ml-5">(2-11 tahun)</div>
              <hr className="my-2" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between w-full">
                <span className="text-16px font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faBaby} /> Bayi
                </span>
                <div className="flex gap-x-2 items-center">
                  <button
                    onClick={() => handleDecrement(setInfants, setTempInfants, tempInfants)}
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="" icon={faMinus} />
                  </button>
                  <span className="px-3 border py-[2px] w-12 rounded-sm text-center">
                    {tempInfants}
                  </span>
                  <button
                    onClick={() => handleIncrement(setInfants, setTempInfants, tempInfants)}
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="text-blue-600" icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className="text-gray-400 text-left ml-5">(dibawah 2 tahun)</div>
              <hr className="mt-2" />
            </div>

            <div className="flex justify-end w-full">
              <button
                className="bg-blue-600 text-white p-2 text-md px-5 mt-5 mb-2 font-[600] rounded-md"
                onClick={confirmPassenger}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
      <div className="flex flex-col sm:flex-row gap-x-4 w-full">
        <div className="flex-grow  max-w-[426.44px]">
          <h2 className="font-[600] text-gray-primary">Penumpang</h2>
          <button
            onClick={openModalPassenger}
            className="text-left my-2 border p-3 font-[600] w-full"
          >
            <span className="block w-[135.66px]">{adults + children + infants} Penumpang</span>
          </button>
        </div>
        <SeatClass />
      </div>
    </div>
  )
}
