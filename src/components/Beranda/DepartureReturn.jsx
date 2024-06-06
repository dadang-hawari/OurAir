import { faCalendarDays, faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import ReactModal from 'react-modal';
import { customStyles } from '../../styles/customStyles';
import '../../styles/toast.css';
import '../../styles/calendar.css';

export const DepartureReturn = () => {
  ReactModal.setAppElement('#modal');

  const [isReturn, setIsReturn] = useState(true);
  const [departureReturn, setDepartureReturn] = useState(['Tanggal Berangkat', 'Jadwal Kembali']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderButton = (type, onClick) => {
    const chevron = type === 'left' ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />;
    return (
      <button type="button" className="p-1" onClick={onClick}>
        {chevron}
      </button>
    );
  };

  const setReturn = () => {
    setIsReturn(!isReturn);
    if (isReturn === true) setDepartureReturn([departureReturn[0], 'Jadwal Kembali']);
  };

  const handleDateChange = (value) => {
    if (isReturn && value.length === 2) {
      setDepartureReturn(value.map((date) => date.format('DD MMMM YYYY')));
    } else if ( value.length === 1) {
      setDepartureReturn([value[0].format('DD MMMM YYYY'), 'Jadwal Kembali']);
    } else {
      setDepartureReturn([value[1].format('DD MMMM YYYY'), 'Jadwal Kembali']);

    }
  };
  

  const Close = () => {
    return (
      <div className="absolute top-8 cursor-pointer py-[10px] px-3 right-8 text-xs text-gray-500" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
    );
  };

  return (
    <div className="flex gap-x-8 w-full justify-between md:ml-1">
      <div className="text-gray-primary flex gap-x-4 text-sm font-[600] items-center">
        <FontAwesomeIcon icon={faCalendarDays} className="h-5" width="20" /> Date
      </div>
      <div className="flex gap-x-4 w-full">
        <div className="flex-grow" id="keberangkatan">
          <b className="text-gray-primary font-[600] block">Keberangkatan</b>
          <button onClick={openModal} className="text-left my-2 font-[600] w-max">
            {departureReturn[0]}
          </button>
          <hr className="mt-1" />
        </div>
        <div className="flex-grow" id="kepulangan">
          <div className="flex gap-x-5 w-full">
            <b className="text-gray-primary font-[600]">Kepulangan</b>
            <button onClick={setReturn} id="returnBtn" aria-label="Tombol kepulangan" className={`w-10 h-5 flex items-center rounded-full transition-colors duration-300 cursor-pointer ${isReturn ? 'bg-accent' : 'bg-gray-300'}`}>
              <div className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform ${isReturn ? 'translate-x-full' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <div className="relative">
            <button onClick={openModal} className={`text-left my-2 font-[600] ${!isReturn ? 'text-gray-primary cursor-not-allowed' : ''}`} disabled={!isReturn}>
              {isReturn ? departureReturn[1] : 'Tidak Kembali'}
            </button>
            <hr className="mt-1" />
            <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} className="border-none absolute top-7 overflow-hidden">
              <Calendar className="rounded-xl px-5 pb-3 py-4" value={departureReturn} onChange={handleDateChange} numberOfMonths={2} monthYearSeparator="-" range={isReturn} showOtherDays highlightToday={false} format="DD MMMM YYYY" weekDays={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']} renderButton={renderButton}>
                <Close />
              </Calendar>
            </ReactModal>
          </div>
        </div>
      </div>
    </div>
  );
};
