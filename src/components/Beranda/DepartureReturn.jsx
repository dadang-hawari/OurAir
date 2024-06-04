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
  ReactModal.setAppElement('#modal')

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
  const closeModal = () => {
    setIsModalOpen(false)
    // document.body.style.overflowY = 'auto'
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

  const setReturn = () => {
    setIsReturn(!isReturn)
    if (isReturn === true)
      setDepartureReturn([departureReturn[0], 'Jadwal Kembali'])
  }

  //   Pekerjaan Nanti bagian penyebab kemmungkinan saat jadwal kepulangan false, kemudian pilih keberangkatan harus klik 2x biar bisa terpilih
  const handleDateChange = (value) => {
    if (isReturn && value.length === 2) {
      console.log('satu')
      setDepartureReturn(value.map((date) => date.format('DD MMMM YYYY')))
    } else if (value.length === 1) {
      console.log('dua')
      console.log('value :>> ', [value[0].format('DD MMMM YYYY')])
      setDepartureReturn([value[0].format('DD MMMM YYYY'), 'Jadwal Kembali'])
    } else {
      console.log('tiga')
      console.log('value tiga:>> ', [value[0].format('DD MMMM YYYY')])
      setDepartureReturn(['Tanggal Berangkat', 'Jadwal Kembali'])
    }
  }

  //   const Close = () => {
  //     return (
  //       <div
  //         className="absolute top-8 cursor-pointer p-2 right-9 text-xs text-secondary"
  //         onClick={closeModal}
  //       >
  //         Tutup
  //       </div>
  //     )
  //   }

  return (
    <div className="flex gap-x-8 w-full justify-between ">
      <div className="text-gray-primary flex gap-x-4 text-sm font-[600] items-center">
        <FontAwesomeIcon icon={faCalendarDays} className="h-5" width="20" />{' '}
        Date
      </div>
      <div className="flex gap-x-4 w-full">
        <div>
          <b className="text-gray-primary font-[600]">Keberangkatan</b>
          <button
            onClick={openModal}
            className="text-left my-2 text-16px font-[600]"
          >
            {departureReturn[0]}
          </button>
          <hr className="mt-1" />
        </div>
        <div>
          <div className="flex gap-x-5">
            <b className="text-gray-primary font-[600]">Kepulangan</b>
            <button
              onClick={setReturn}
              id="returnBtn"
              aria-label="Tombol kepulangan"
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
