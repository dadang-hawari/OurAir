import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { getFlightByCityorCountry } from '../../redux/actions/flightsAction'
import { useEffect } from 'react'

export default function DestinasiFavorit() {
  const airports = useSelector((state) => state?.flightLists?.flightsByCountry?.flights)
  console.log('airports', airports)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFlightByCityorCountry('Indonesia'))
  }, [])

  const formatFlightDates = (arrivalTime, departureTime) => {
    const arrivalDay = new Date(arrivalTime).getDate()
    const departureDay = new Date(departureTime).getDate()
    return `${departureDay} - ${arrivalDay} ${new Intl.DateTimeFormat('id-ID', {
      month: 'long',
      year: 'numeric',
    }).format(new Date(arrivalTime))}`
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
      .format(amount)
      .replace(/\D00(?=\D*$)/, '')
  }

  return (
    <div className="mt-[630px] sm:mt-[375px] md:mt-[355px] xl:mt-[350px] max-w-[1040px] mx-auto md:px-0 px-4">
      <h2 className="font-bold px-5 text-xl">
        Rekomendasi <span className="text-accent">Destinasi</span>{' '}
      </h2>
      <div className="flex gap-x-3 px-5 overflow-x-auto">
        <button
          className="text-sm text-white max-w-32 min-w-32 w-full h-12 my-4 rounded-xl bg-secondary"
          onClick={() => dispatch(getFlightByCityorCountry('Indonesia'))}
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Indonesia
        </button>
        <button
          className="text-sm text-black max-w-32 min-w-32 w-full h-12 my-4 rounded-xl bg-soft-blue"
          onClick={() => dispatch(getFlightByCityorCountry('Malaysia'))}
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Malaysia
        </button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {airports?.map((airport, i) => (
          <div key={i} className="border rounded-md">
            <img
              src={airport?.toAirport?.thumbnail}
              alt={airport?.toAirport?.cityName}
              className="w-full  mb-2 min-h-40 max-h-40 object-cover rounded-t-md"
            />
            <div className=" p-1 flex flex-col gap-y-1 pb-2 px-2">
              <div className="font-[600] text-sm flex items-center gap-2">
                <span title={airport?.fromAirport?.cityName}>
                  {airport?.fromAirport?.cityName?.length > 12
                    ? airport?.fromAirport?.cityName?.slice(0, 12) + '...'
                    : airport?.fromAirport?.cityName}
                </span>
                <FontAwesomeIcon icon={faArrowRight} />
                {airport?.toAirport?.cityName}
              </div>
              <div className="font-bold text-secondary text-xs">AirAsia</div>

              <div className="text-sm">
                {formatFlightDates(airport?.arrival_time, airport?.departure_time)}
              </div>
              <div className="text-sm">
                Harga : {'  '}
                <span className="text-red-500 font-bold">
                  {formatCurrency(airport?.ticket_price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
