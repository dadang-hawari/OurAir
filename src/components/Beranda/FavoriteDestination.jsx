import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DestinasiFavorit (){
    return (  
        <div className="mt-64 max-w-5xl mx-auto px-4">
    <h2 className="font-bold ">Destinasi Favorit</h2>
    <button className="text-sm text-white max-w-32 w-full h-12 my-4 rounded-xl bg-secondary">
      <FontAwesomeIcon icon={faSearch} className="mr-2" />
      Semua
    </button>
    {/* <div className="flex flex-wrap justify-around gap-y-4"> */}
    <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 px-4">
      <div>
        <img src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593" alt="Jakarta" className="w-full xl:max-w-[232.5px] mb-2 h-auto object-cover rounded-md" />
        <h2 className="font-[600]">Jakarta - Manila</h2>
        <b className="text-xs text-secondary">AirAsia</b>
        <p>20 - 30 Maret 2023</p>
        <p>
          Mulai dari <b className="text-red-500">IDR 950.00</b>
        </p>
      </div>
      <div>
        <img src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593" alt="Jakarta" className="w-full xl:max-w-[232.5px] mb-2 h-auto object-cover rounded-md" />
        <h2 className="font-[600]">Jakarta - Manila</h2>
        <b className="text-xs text-secondary">AirAsia</b>
        <p>20 - 30 Maret 2023</p>
        <p>
          Mulai dari <b className="text-red-500">IDR 950.00</b>
        </p>
      </div>
      <div>
        <img src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593" alt="Jakarta" className="w-full xl:max-w-[232.5px] mb-2 h-auto object-cover rounded-md" />
        <h2 className="font-[600]">Jakarta - Manila</h2>
        <b className="text-xs text-secondary">AirAsia</b>
        <p>20 - 30 Maret 2023</p>
        <p>
          Mulai dari <b className="text-red-500">IDR 950.00</b>
        </p>
      </div>
      <div>
        <img src="https://ik.imagekit.io/5zwoz8nkr/ourair/User/jakarta.webp?updateat=1717051701593" alt="Jakarta" className="w-full xl:max-w-[232.5px] mb-2 h-auto object-cover rounded-md" />
        <h2 className="font-[600]">Jakarta ❯ Manila</h2>
        <b className="text-xs text-secondary">AirAsia</b>
        <p>20 - 30 Maret 2023</p>
        <p>
          Mulai dari <b className="text-red-500">IDR 950.00</b>
        </p>
      </div>
    </div>
  </div>)
}