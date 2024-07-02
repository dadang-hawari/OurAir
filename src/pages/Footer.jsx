import { Link } from 'react-router-dom'
import logoFooter from '../../public/assets/images/logoFooter.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="bg-white p-10">
      <hr className="my-6 " />
      <div className="flex flex-col md:flex-row justify-center flex-wrap ">
        <div className="flex  items-center text-black text-lg font-bold mt-9 mr-9 "></div>
        <div className="flex w-full flex-col justify-start sm:justify-between gap-5 sm:flex-row flex-wrap  max-w-5xl">
          <h2 className="w-full xl:w-fit font-bold my-auto">
            <span className="text-[#13587B] text-3xl">Our</span>
            <span className="text-[#C87632] text-3xl">Air</span>
          </h2>
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-black mb-4">Navigasi</h3>
            <p className="my-2">
              <Link to="/" className="my-2 text-xs">
                Beranda
              </Link>
            </p>
            <p className="my-2">
              <Link to="/tentang" className="my-2 text-xs ">
                Tentang Kami
              </Link>
            </p>
            <p>
              {' '}
              <Link to="https://sdgs.bappenas.go.id/" className="text-xs w-max block">
                SDGs
              </Link>
            </p>
          </div>

          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-black mb-4">Credits</h3>

            <p className="my-2">
              <Link to="https://fontawesome.com/" target="_blank" className="my-2 text-xs">
                FontAwesome
              </Link>
            </p>
            <p className="my-2">
              <Link
                target="_blank"
                to="https://www.vecteezy.com/free-vector/cloud"
                className="my-2 text-xs"
              >
                Vecteezy
              </Link>
            </p>
          </div>

          <div className="flex mt-9 mr-8 gap-x-6">
            <a
              href="https://github.com/ourair8"
              target="_blank"
              className="text-gray-900 transition-all duration-500 hover:text-secondary"
            >
              <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCfBJezxsBq8mZjgyK5cW4Og"
              className="text-gray-900 transition-all duration-500 hover:text-secondary"
            >
              <svg
                className="w-[1.875rem] h-[1.375rem]"
                viewBox="0 0 30 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.3106 1.27838C27.5782 1.62071 28.5745 2.61957 28.9113 3.88573C29.524 6.18356 29.524 10.9809 29.524 10.9809C29.524 10.9809 29.524 15.7782 28.9113 18.076C28.5698 19.3469 27.5735 20.3457 26.3106 20.6834C24.0186 21.2977 14.8226 21.2977 14.8226 21.2977C14.8226 21.2977 5.63122 21.2977 3.33456 20.6834C2.06695 20.3411 1.07063 19.3422 0.73385 18.076C0.121094 15.7782 0.121094 10.9809 0.121094 10.9809C0.121094 10.9809 0.121094 6.18356 0.73385 3.88573C1.07531 2.61488 2.07162 1.61602 3.33456 1.27838C5.63122 0.664062 14.8226 0.664062 14.8226 0.664062C14.8226 0.664062 24.0186 0.664062 26.3106 1.27838ZM19.5234 10.9809L11.885 15.403V6.55872L19.5234 10.9809Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="mailto:support@ourair.tech"
              className="text-gray-900 transition-all duration-500  hover:text-secondary"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <hr className="my-6 " />
      <span className="text-sm text-gray-500 text-center block mt-6">
        ©<a href="https://ourair.tech/">OurAir</a> 2024, All rights reserved.
      </span>
    </footer>
  )
}

export default Footer
