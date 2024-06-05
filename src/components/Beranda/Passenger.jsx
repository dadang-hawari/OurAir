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

export const Passengers = () => {
  const [isModalOpenPassenger, setIsModalOpenPassenger] = useState(false)
  const [adults, setAdults] = useState(2)
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
    <div className="flex gap-x-8 w-full">
      <ReactModal
        isOpen={isModalOpenPassenger}
        onRequestClose={closeModalPassenger}
        style={customStyles}
        className="border-none relative mx-20 overflow-hidden"
      >
        <div className="text-center bg-white p-4 rounded-md relative">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={closeModalPassenger}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>

          <div className="flex flex-wrap gap-6 mt-5 justify-center">
            <div className="w-full">
              <hr className="mt-2 " />
              <div className="flex items-center justify-between my-2">
                <span className="text-16px font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faPerson} /> Dewasa
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleDecrement(setAdults, setTempAdults, tempAdults)
                    }
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="" icon={faMinus} />
                  </button>
                  <span className="px-3 border">{tempAdults}</span>
                  <button
                    onClick={() =>
                      handleIncrement(setAdults, setTempAdults, tempAdults)
                    }
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="text-blue-600" icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="text-gray-400 text-left ml-5">
                (12 tahun keatas)
              </div>
              <hr className="mt-1" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between my-2 w-full">
                <span className="text-16px font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faChild} /> Anak
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleDecrement(
                        setChildren,
                        setTempChildren,
                        tempChildren
                      )
                    }
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="px-3 border">{tempChildren}</span>
                  <button
                    onClick={() =>
                      handleIncrement(
                        setChildren,
                        setTempChildren,
                        tempChildren
                      )
                    }
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="text-blue-600" icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="text-gray-400 text-left ml-5">(2-11 tahun)</div>
              <hr className="mt-1" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between my-1 w-full">
                <span className="text-16px font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faBaby} /> Bayi
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleDecrement(setInfants, setTempInfants, tempInfants)
                    }
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="" icon={faMinus} />
                  </button>
                  <span className="px-3 border">{tempInfants}</span>
                  <button
                    onClick={() =>
                      handleIncrement(setInfants, setTempInfants, tempInfants)
                    }
                    className="px-2 py-1 border"
                  >
                    <FontAwesomeIcon className="text-blue-600" icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className="text-gray-400 text-left ml-5">
                (dibawah 2 tahun)
              </div>
              <hr className="mt-1" />
            </div>

            <div className="flex justify-end w-full">
              <button
                className="bg-blue-600 text-white p-2 text-lg rounded-md"
                onClick={confirmPassenger}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </ReactModal>

      <div className="text-gray-400 flex gap-x-4 items-center">
        <img
          src="assets/images/Vector (1).png"
          alt="Passenger"
          className="w-4 select-none none"
        />
        Seat
      </div>

      <div className="flex gap-x-4 w-full">
        <div>
          <h4 className="text-sm">Passenger</h4>
          <button
            onClick={openModalPassenger}
            className="text-left my-2 text-sm font-[600] bg-white w-max  rounded-md"
          >
            {adults + children + infants} Penumpang
          </button>
          <hr className="mt-1" />
        </div>
      </div>
    </div>
  )
}
