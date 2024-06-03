import { useState } from 'react'
import ReactModal from 'react-modal'
import { customStyles } from '../../styles/customStyles'

export const Passengers = () => {
  const [isModalOpenPassengger, setIsModalOpenPassengger] = useState(false)

  const openModalPassengger = () => {
    setIsModalOpenPassengger(true)
  }
  const closeModalPassengger = () => {
    setIsModalOpenPassengger(false)
  }
  return (
    <div className="flex gap-x-8 w-full">
      <ReactModal
        isOpen={isModalOpenPassengger}
        onRequestClose={closeModalPassengger}
        style={customStyles}
      >
        <div className="text-center">
          <div>Penumpang</div>
          <div className="flex flex-wrap gap-6 mt-5 justify-center">
            <button
              className="border-gray-500 border text-black p-2 rounded-md"
              onClick={closeModalPassengger}
            >
              Cancel
            </button>
          </div>
        </div>
      </ReactModal>
      <div className="text-gray-400 flex gap-x-4 items-center">
        <img
          src="assets/images/Vector (1).png"
          alt="Passenger"
          className="w-4 select-none none"
        />
      </div>

      <div className="flex gap-x-4 w-full">
        <div>
          <h4>Passenger</h4>
          <button
            onClick={openModalPassengger}
            className="text-left my-2 font-[600]"
          >
            2 Penumpang
          </button>
          <hr className="mt-1" />
        </div>
        <div>
          <div className="flex gap-x-5">
            <h4>Seat Class</h4>
          </div>
          <button className="text-left my-2 font-[600]">Business</button>
          <hr className="mt-1" />
        </div>
      </div>
    </div>
  )
}
