import dayjs, { locale } from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTanggalBerangkatKembali } from '../../redux/reducers/jadwalPenerbanganReducer'
import { getFlightByCityorCountry } from '../../redux/actions/flightsAction'
import { setIsLoading } from '../../redux/reducers/flightsReducer'
import 'dayjs/locale/id'
export const DateList = () => {
  const [dates, setDates] = useState([])
  const jadwalPenerbangan = useSelector((state) => state?.jadwalPenerbangan)
  const kotaKeberangkatan = jadwalPenerbangan?.departureCity
  const kotaTujuan = jadwalPenerbangan?.arrivalCity
  const tanggalBerangkat = jadwalPenerbangan?.tanggalBerangkatKembali[0]
  const tanggalKembali = jadwalPenerbangan?.tanggalBerangkatKembali[1]
  const kelas = jadwalPenerbangan?.kelas
  const convertDateFormat = (dateString) => {
    if (dateString === 'Jadwal Kembali' || dateString === 'Tanggal Berangkat') return
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Bulan dimulai dari 0, jadi tambahkan 1
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDate = (dateString) => {
    // Parsing tanggal dari format "01 July 2024"
    const date = dayjs(dateString, 'DD MMMM YYYY')
    // Format tanggal ke "YYYY-MM-DD"
    const formattedDate = date.format('YYYY-MM-DD')
    return formattedDate
  }

  const [chosenDate, setChosenDate] = useState(formatDate(tanggalBerangkat))
  const dispatch = useDispatch()
  const formattedTanggalKembali = convertDateFormat(tanggalKembali)

  const setTanggalBerangkat = (tanggal) => {
    dispatch(setIsLoading(true))
    dispatch(
      getFlightByCityorCountry(
        kotaKeberangkatan,
        kotaTujuan,
        kelas?.name,
        tanggal,
        formattedTanggalKembali
      )
    ).then(() => dispatch(setIsLoading(false)))
  }

  const generateDates = (startIndex = 0, numberOfDays = 11) => {
    let tempDates = []
    for (let i = startIndex; i < startIndex + numberOfDays; i++) {
      let date = dayjs().add(i, 'day')
      tempDates.push(date)
    }
    // Remove duplicate dates
    tempDates = tempDates.filter((date) => !dates.some((d) => d.isSame(date, 'day')))
    setDates((prevDates) => [...prevDates, ...tempDates])
  }

  const handleScroll = (event) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target

    if (scrollLeft + clientWidth >= scrollWidth) {
      // generate more dates when the user scrolls to the end
      generateDates(dates.length)
    }
  }
  useEffect(() => {
    generateDates()
  }, [])
  return (
    <div
      className="text-sm flex justify-between mb-5 mt-4 gap-x-2 overflow-x-auto pb-2"
      onScroll={handleScroll}
    >
      {dates.map((date, index) => (
        <div
          key={index}
          onClick={() => {
            setTanggalBerangkat(date.format('YYYY-MM-DD'))
            setChosenDate(date.format('YYYY-MM-DD'))
            dispatch(setTanggalBerangkatKembali([date.format('DD MMMM YYYY'), tanggalKembali]))
          }}
          className={`text-center max-w-24 h-11 py-1 px-4 cursor-pointer transition-colors rounded-md ${
            chosenDate === date.format('YYYY-MM-DD')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          <b>{dayjs(date).locale('id').format('dddd')}</b>
          <div
            className={`${
              chosenDate === date.format('YYYY-MM-DD') ? 'text-white' : 'text-gray-300'
            } text-xs`}
          >
            {date.format('DD/MM/YYYY')}
          </div>
        </div>
      ))}
    </div>
  )
}
