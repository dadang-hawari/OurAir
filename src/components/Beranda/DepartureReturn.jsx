import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Calendar } from 'react-multi-date-picker'
import ReactModal from 'react-modal'
import { customStyles } from '../../styles/customStyles'
import '../../styles/toast.css'

export const DepartureReturn = () => {
  const [isReturn, setIsReturn] = useState(true)
  const [departureReturn, setDepartureReturn] = useState([
    'Tanggal Berangkat',
    'Jadwal Kembali',
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
    // document.body.style.overflowY = 'hidden'
  }
  const renderButton = (type, onClick) => {
    const chevron =
      type === 'left' ? (
        <FontAwesomeIcon icon={faChevronLeft} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} />
      )
    return (
      <button type="button" className="p-1" onClick={onClick}>
        {chevron}
      </button>
    )
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // document.body.style.overflowY = 'auto'
  }

  const setReturn = () => {
    setIsReturn(!isReturn)
    if (isReturn === true)
      setDepartureReturn([departureReturn[0], 'Jadwal Kembali'])
  }

  const handleDateChange = (value) => {
    if (value.length === 2 && isReturn) {
      console.log('value 1:>> ', value)

      setDepartureReturn(value.map((date) => date.format('DD MMMM YYYY')))
    } else if (value.length === 1) {
      console.log('value2 :>> ', value)

      setDepartureReturn([value[0].format('DD MMMM YYYY'), 'Jadwal Kembali'])
    } else {
      console.log('value :>> ', value)
      setDepartureReturn(['Tanggal Berangkat', 'Jadwal Kembali'])
    }
  }

  const Close = () => {
    return (
      <div
        className="absolute top-8 cursor-pointer p-2 right-9 text-xs text-secondary"
        onClick={closeModal}
      >
        Tutup
      </div>
    )
  }

  return (
    <div className="flex gap-x-8 w-full justify-between ">
      <div className="text-gray-400 flex gap-x-4 items-center">
        <FontAwesomeIcon icon={faCalendarDays} className="h-5" width="20" />{' '}
        Jadwal
      </div>
      <div className="flex gap-x-4 w-full bg-red-500">
        <div className="bg-red-500">
          <h4>Keberangkatan</h4>
          <button
            onClick={openModal}
            className="text-left my-2 text-16px font-[600]"
          >
            {departureReturn[0]}
          </button>
          <hr className="mt-1" />
        </div>
        <div className="bg-blue-500">
          <div className="flex gap-x-5">
            <h4>Kepulangan</h4>
            <button
              onClick={setReturn}
              className={`w-10 h-5 flex items-center rounded-full transition-colors duration-300 cursor-pointer ${
                isReturn ? 'bg-accent' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform  ${
                  isReturn ? 'translate-x-full' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
          <div className="relative">
            <button
              onClick={openModal}
              className={`text-left my-2 text-16px font-[600] ${
                !isReturn ? 'text-gray-primary cursor-not-allowed' : ''
              }`}
              disabled={!isReturn}
            >
              {isReturn ? departureReturn[1] : 'Tidak Kembali'}
            </button>
            <hr className="mt-1" />

            <ReactModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              appElement={document.getElementById('modal')}
              className="border-none absolute top-7 overflow-hidden"
            >
              <Calendar
                className="rounded-xl px-5"
                value={departureReturn}
                onChange={handleDateChange}
                numberOfMonths={2}
                monthYearSeparator="-"
                range={isReturn}
                showOtherDays
                highlightToday={false}
                format="DD MMMM YYYY"
                weekDays={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
                renderButton={renderButton}
              >
                {/* <Close /> */}
              </Calendar>
            </ReactModal>
          </div>
        </div>
      </div>
    </div>
  )
}
