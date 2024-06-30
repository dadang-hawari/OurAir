import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const AirPortList = ({ airports, onCitySelect, selectedCityType }) => {
  const removeDuplicateAirports = (airports) => {
    const seenAirports = new Set()
    return airports?.filter((airport) => {
      const airportName = selectedCityType === 'departure' ? airport?.fromAirport?.name : airport?.toAirport?.name
      if (seenAirports.has(airportName)) {
        return false
      } else {
        seenAirports.add(airportName)
        return true
      }
    })
  }

  const sortedAirports = airports?.sort((a, b) => (selectedCityType === 'departure' ? a?.fromAirport?.name.localeCompare(b.fromAirport?.name) : a?.toAirport?.name.localeCompare(b.toAirport?.name)))

  const uniqueAirports = removeDuplicateAirports(sortedAirports)
  console.log('uniqueAirports', uniqueAirports)

  return uniqueAirports?.length > 0 ? (
    uniqueAirports.map((airport, index) => (
      <div key={index} onClick={() => onCitySelect(airport)} className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-100">
        <FontAwesomeIcon className="text-gray-400" icon={faLocationDot} />
        <div className="ps-3">
          {selectedCityType === 'departure' ? airport?.fromAirport?.name : airport?.toAirport?.name}
          <div className="text-gray-400 text-sm">{selectedCityType === 'departure' ? airport?.fromAirport?.countryName : airport?.toAirport?.countryName}</div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center p-4 text-gray-500">Bandara atau negara tidak ditemukan</div>
  )
}
