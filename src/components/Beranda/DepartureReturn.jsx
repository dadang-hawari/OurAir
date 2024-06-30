import { faCalendarDays, faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Calendar } from 'react-multi-date-picker'
import ReactModal from 'react-modal'
import { customStyles } from '../../styles/customStyles'
import '../../styles/toast.css'
import '../../styles/calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFlights } from '../../redux/actions/flightsAction'
import { setTanggalBerangkatKembali } from '../../redux/reducers/jadwalPenerbanganReducer'

export const DepartureReturn = () => {
  ReactModal.setAppElement('#modal')

  const [isReturn, setIsReturn] = useState(false)
  const tanggalBerangkatKembali = useSelector((state) => state?.jadwalPenerbangan?.tanggalBerangkatKembali)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [width, setWidth] = useState(window.outerWidth)
  const dispatch = useDispatch()

  const openModal = () => {
    setIsModalOpen(true)
    dispatch(getAllFlights())
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const renderButton = (type, onClick) => {
    const chevron = type === 'left' ? <FontAwesomeIcon icon={faChevronLeft} className="text-gray-400" /> : <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
    return (
      <button type="button" className="p-1 " onClick={onClick}>
        {chevron}
      </button>
    )
  }
  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  const windowListener = () => {
    window.addEventListener('resize', handleResize)
  }

  useEffect(() => {
    windowListener()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const setReturn = () => {
    setIsReturn(!isReturn)
    if (isReturn === true) dispatch(setTanggalBerangkatKembali([tanggalBerangkatKembali[0], 'Jadwal Kembali']))
  }

  const handleDateChange = (value) => {
    if (isReturn && value.length === 2) {
      dispatch(setTanggalBerangkatKembali(value.map((date) => date.format('DD MMMM YYYY'))))
    } else if (value.length === 1) {
      dispatch(setTanggalBerangkatKembali([value[0].format('DD MMMM YYYY'), 'Jadwal Kembali']))
    } else {
      dispatch(setTanggalBerangkatKembali([value[1].format('DD MMMM YYYY'), 'Jadwal Kembali']))
    }
  }

  const Close = () => {
    return (
      <div className="absolute top-[2px] cursor-pointer pt-2 py-1 px-[13px] right-0 text-xs text-gray-500" onClick={closeModal}>
        <FontAwesomeIcon icon={faXmark} className="h-4" />
      </div>
    )
  }

  return (
    <div className="flex gap-x-7 w-full justify-between md:ml-1">
      <div className="text-gray-primary hidden sm:flex gap-x-4 text-sm font-[600] w-16 items-center">
        <FontAwesomeIcon icon={faCalendarDays} className="h-5" width="20" /> Date
      </div>
      <div className="flex flex-col sm:flex-row gap-x-4 w-full">
        <div className="flex-grow w-full">
          <b className="text-gray-primary font-[600] block">Keberangkatan</b>
          <button onClick={openModal} className="text-left my-2 border p-3  font-[600] w-full">
            <span className="w-[135.66px] block">{tanggalBerangkatKembali[0]}</span>
          </button>
        </div>
        <div className="flex-grow w-full">
          <div className="flex gap-x-5 w-full">
            <b className="text-gray-primary font-[600]">Kepulangan</b>
            <button onClick={setReturn} id="returnBtn" aria-label="Tombol kepulangan" className={`w-10 h-5 flex items-center rounded-full transition-colors duration-300 cursor-pointer ${isReturn ? 'bg-accent' : 'bg-gray-300'}`}>
              <div className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform ${isReturn ? 'translate-x-full' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <div className="relative">
            <button onClick={openModal} className={`text-left my-2 font-[600] w-full border p-3 ${!isReturn ? 'text-gray-primary cursor-not-allowed' : ''}`} disabled={!isReturn}>
              {isReturn ? tanggalBerangkatKembali[1] : 'Tidak Kembali'}
            </button>
            <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} className="border-none absolute top-7   overflow-hidden">
              <div className="departure">
                <Calendar className="rounded-xl pb-3 px-4 pt-5" value={tanggalBerangkatKembali} onChange={handleDateChange} numberOfMonths={width < 650 ? 1 : 2} monthYearSeparator="-" range={isReturn} showOtherDays disableYearPicker disableMonthPicker highlightToday={false} format="DD MMMM YYYY" weekDays={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']} renderButton={renderButton}>
                  <Close />
                </Calendar>
              </div>
            </ReactModal>
          </div>
        </div>
      </div>
    </div>
  )
}
