import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTanggalBerangkatKembali } from '../../redux/reducers/jadwalPenerbanganReducer'

dayjs.locale('id')

export const DateList = () => {
  const [dates, setDates] = useState([])
  const [currentDate, setCurrentDate] = useState(dayjs().format('DD-MM-YYYY'))
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)
  const tanggalBerangkat = jadwalPenerbangan?.tanggalBerangkatKembali[0]

  const [chosenDate, setChosenDate] = useState()
  const dispatch = useDispatch()

  const setTanggalBerangkat = (tanggal) => {
    alert(tanggal)
  }

  const formatDate = (dateString) => {
    // Parsing tanggal dari format "01 July 2024"
    const date = dayjs(dateString, 'DD MMMM YYYY')
    // Format tanggal ke "DD-MM-YYYY"
    const formattedDate = date.format('DD-MM-YYYY')
    return formattedDate
  }

  const formattedDate =
    tanggalBerangkat === 'Jadwal Berangkat'
      ? currentDate
      : chosenDate
      ? chosenDate
      : formatDate(tanggalBerangkat)

  useEffect(() => {
    generateDates()
  }, [])

  const generateDates = (startIndex = 0, numberOfDays = 11) => {
    let tempDates = []
    for (let i = startIndex; i < startIndex + numberOfDays; i++) {
      let date = dayjs().add(i, 'day')
      tempDates.push(date)
    }
    setDates((prevDates) => [...prevDates, ...tempDates])
  }

  const handleScroll = (event) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target
    if (scrollLeft + clientWidth >= scrollWidth) {
      // generate more dates when the user scrolls to the end
      generateDates(dates.length)
    }
  }

  return (
    <div
      className="text-sm flex justify-between my-5 gap-x-2 overflow-x-auto pb-2"
      onScroll={handleScroll}
    >
      {dates.map((date, index) => (
        <div
          key={index}
          onClick={() => {
            setTanggalBerangkat(date.format('DD-MM-YYYY'))
            setChosenDate(date.format('DD-MM-YYYY'))
          }}
          className={`text-center max-w-24 h-11 py-1 px-4 cursor-pointer rounded-md ${
            formattedDate === date.format('DD-MM-YYYY')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          <b>{date.format('dddd')}</b>
          <p className="text-gray-400 text-xs">{date.format('DD/MM/YYYY')}</p>
        </div>
      ))}
    </div>
  )
}
