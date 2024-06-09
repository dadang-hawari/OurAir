import { useState } from 'react'
import ReactModal from 'react-modal'
import { customStyles } from '../../styles/customStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export const SeatClass = () => {
  const [isModalOpenSeatClass, setIsModalOpenSeatClass] = useState(false)
  const [selectedSeatClass, setSelectedSeatClass] = useState(null)
  const [tempSelectedSeatClass, setTempSelectedSeatClass] = useState(null)

  const openModalSeatClass = () => {
    setIsModalOpenSeatClass(true)
    setTempSelectedSeatClass(selectedSeatClass)
  }

  const closeModalSeatClass = () => {
    setIsModalOpenSeatClass(false)
  }

  const selectSeatClass = (seatClass) => {
    setTempSelectedSeatClass(seatClass)
  }

  const confirmSeatClass = () => {
    setSelectedSeatClass(tempSelectedSeatClass)
    closeModalSeatClass()
  }

  const seatClasses = [
    { name: 'Economy', price: 4950000 },
    { name: 'Premium Economy', price: 7550000 },
    { name: 'Business', price: 29220000 },
    { name: 'First Class', price: 87620000 },
  ]

  return (
    <div className="flex-grow">
      <ReactModal
        isOpen={isModalOpenSeatClass}
        onRequestClose={closeModalSeatClass}
        style={customStyles}
        className="border-none relative mx-10 overflow-hidden"
      >
        <div className="text-center bg-white p-3 rounded-md relative">
          <div className="absolute top-2 right-2 cursor-pointer" onClick={closeModalSeatClass}>
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </div>
          <div className="flex flex-wrap gap-4 mt-3 justify-center">
            {seatClasses.map((seatClass, index) => (
              <div key={index} className="w-full">
                <hr className="mt-1" />
                <button
                  className={`hover:bg-blue-50  text-left ml-3 font-bold text-black p-1 rounded-md w-full ${
                    tempSelectedSeatClass?.name === seatClass.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-white'
                  }`}
                  onClick={() => selectSeatClass(seatClass)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      {seatClass.name}
                      <div
                        className={`${
                          tempSelectedSeatClass?.price === seatClass.price
                            ? 'text-white'
                            : 'text-blue-500'
                        } text-left mt-1 text-sm`}
                      >
                        IDR {seatClass.price.toLocaleString()}
                      </div>
                    </div>
                    {tempSelectedSeatClass?.name === seatClass.name && (
                      <FontAwesomeIcon icon={faCheckCircle} className=" h-5 text-green-600" />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
          <hr className="mt-5" />
          <div className="flex justify-end w-full mt-3">
            <button
              className="bg-blue-600 text-white p-2 text-sm rounded-md"
              onClick={confirmSeatClass}
            >
              Simpan
            </button>
          </div>
        </div>
      </ReactModal>

      <div className="flex gap-x-5 w-full">
        <h2 className="font-[600] text-gray-primary">Kelas</h2>
      </div>
      <div>
        <button
          onClick={openModalSeatClass}
          className="text-left my-2 border p-3  font-[600] w-full"
        >
          {selectedSeatClass ? `${selectedSeatClass.name}` : 'Pilih Seat Class'}
        </button>
      </div>
    </div>
  )
}
