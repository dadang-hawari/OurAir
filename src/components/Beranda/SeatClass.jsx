import { useState } from 'react'
import ReactModal from 'react-modal'
import { customStylesDestination } from '../../styles/customStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setSeatClass } from '../../redux/reducers/jadwalPenerbanganReducer'

export const SeatClass = () => {
  const [isModalOpenSeatClass, setIsModalOpenSeatClass] = useState(false)
  const [tempSelectedSeatClass, setTempSelectedSeatClass] = useState(null)
  const selectedSeatClass = useSelector((state) => state?.jadwalPenerbangan?.kelas)
  const dispatch = useDispatch()

  const openModalSeatClass = () => {
    setIsModalOpenSeatClass(true)
    setTempSelectedSeatClass(selectedSeatClass)
  }

  const closeModalSeatClass = () => {
    setIsModalOpenSeatClass(false)
  }

  const selectSeatClass = (seatClass) => {
    setTempSelectedSeatClass(seatClass)
    dispatch(setSeatClass(seatClass))
  }

  const confirmSeatClass = () => {
    dispatch(setSeatClass(tempSelectedSeatClass))
    closeModalSeatClass()
  }

  const seatClasses = [{ name: 'Economy' }, { name: 'Business' }, { name: 'First Class' }]

  return (
    <div className="flex-grow w-full">
      <ReactModal
        isOpen={isModalOpenSeatClass}
        onRequestClose={closeModalSeatClass}
        style={customStylesDestination}
        className="border-none relative overflow-hidden max-w-[800px] px-4 w-full"
      >
        <div className="text-center bg-white py-3 rounded-md relative">
          <div className="absolute top-2 right-2 cursor-pointer" onClick={closeModalSeatClass}>
            <FontAwesomeIcon icon={faTimes} size="sm" className="text-gray-500" />
          </div>
          <div className="flex flex-wrap  mt-5 justify-center w-full">
            {seatClasses.map((seatClass, index) => (
              <div key={index} className="w-full">
                <hr className="mt-1" />
                <button
                  className={`  text-left  font-bold text-black py-4 px-6 rounded-sm w-full ${
                    tempSelectedSeatClass?.name === seatClass.name
                      ? 'bg-blue-500 text-white h-full'
                      : 'bg-white'
                  }`}
                  onClick={() => {
                    selectSeatClass(seatClass)
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>{seatClass.name}</div>
                    {tempSelectedSeatClass?.name === seatClass.name && (
                      <FontAwesomeIcon icon={faCheckCircle} className=" h-5 text-[#73CA5C]" />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
          <hr />
          <div className="flex justify-end w-full mt-3">
            <button
              className="bg-blue-600 text-white py-3 px-5 my-2 mr-4 text-sm font-[600] rounded-md "
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
