import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

export default function DestinasiFavorit() {
  const airports = useSelector((state) => state?.flightLists?.allFlights?.flights)
  console.log('airports :>> ', airports)
  return (
    <div className="mt-[630px] sm:mt-[375px] md:mt-[355px] xl:mt-[350px]  max-w-5xl mx-auto px-4">
      <h2 className="font-bold text-xl">
        Rekomendasi <span className="text-accent">Destinasi</span>{' '}
      </h2>
      <button className="text-sm text-white max-w-32 w-full h-12 my-4 rounded-xl bg-secondary">
        <FontAwesomeIcon icon={faSearch} className="mr-2" />
        Semua
      </button>
      {/* <div className="flex flex-wrap justify-around gap-y-4"> */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        <div>
          <img
            src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593"
            alt="Jakarta"
            className="w-full  xl:max-w-[232.5px] mb-2 h-auto object-cover rounded-md"
          />
          <h2 className="font-[600]">Jakarta - Manila</h2>
          <b className="text-xs text-secondary">AirAsia</b>
          <p>20 - 30 Maret 2023</p>
          <p>
            Mulai dari <b className="text-red-500">IDR 950.00</b>
          </p>
        </div>
      </div>
    </div>
  )
}
