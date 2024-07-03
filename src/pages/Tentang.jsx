import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import ScrollToTop from '../components/common/ScrollToTop'
import Footer from '../components/common/Footer'

export default function Tentang() {
  return (
    <>
      <Navbar />
      <section className="relative">
        <ScrollToTop />
        <div className="py-8 px-4 mx-auto max-w-screen-xl ">
          <div className="pt-4 flex w-full flex-col md:flex-row-reverse gap-16 mt-40 mb-9 items-center">
            <img
              src="https://raw.githubusercontent.com/DadangHawari/assets/main/ourair.png"
              alt="logo ourair"
              className="w-full max-w-sm sm:mr-10 md:mr-28 h-full"
            />
            <div className=" w-full">
              <h1 className="text-5xl font-bold mb-5 ">OurAir</h1>
              <p className=" text-gray-500 lg:mb-16 sm:text-xl">
                "OurAir Terbang Bersama, Lebih Dekat dengan Dunia...."
              </p>
            </div>
          </div>
          <h2 className="mb-10 mt-40 text-4xl tracking-tight font-extrabold text-gray-900">
            Tim Pengembang
          </h2>
          <h5 className="text-center mb-7 text-gray-900 text-xl font-bold">Back-End</h5>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            <div className="items-center bg-gray-50 rounded-lg border shadow sm:flex ">
              <img
                className="w-full sm:max-w-52 sm:min-w-52 h-auto rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://raw.githubusercontent.com/DadangHawari/assets/main/naufal.jpg"
                alt="Naufal Andya Faiz"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                  Naufal Andya Faiz
                </h3>
                <span className="text-gray-500  my-2  block">Back-End Developer</span>

                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link to="https://github.com/naufalandya" target="_blank">
                      <FontAwesomeIcon icon={faGithub} className="text-gray-500 h-5" />
                    </Link>
                  </li>

                  <Link target="_blank" to="https://www.linkedin.com/in/naufalandyafaiz">
                    <FontAwesomeIcon icon={faLinkedin} className="text-gray-500 h-5 " />
                  </Link>
                  <Link target="_blank" to="https://instagram.com/naufalandya">
                    <FontAwesomeIcon icon={faInstagram} className="text-gray-500 h-5 " />
                  </Link>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg border shadow sm:flex ">
              <img
                className="w-full sm:max-w-52 sm:min-w-52 h-auto rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://raw.githubusercontent.com/DadangHawari/assets/main/adam.jpg"
                alt="Adam Wisnu Pradana"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                  Adam Wisnu Pradana
                </h3>
                <span className="text-gray-500  my-2  block">Back End Developer</span>

                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link target="_blank" to="https://github.com/adamwisnup">
                      <FontAwesomeIcon icon={faGithub} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.linkedin.com/in/adamwisnup/">
                      <FontAwesomeIcon icon={faLinkedin} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.instagram.com/adam_wisnup">
                      <FontAwesomeIcon icon={faInstagram} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg border shadow sm:flex ">
              <img
                className="w-full sm:max-w-52 sm:min-w-52 h-auto rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://raw.githubusercontent.com/DadangHawari/assets/main/huzi.jpg"
                alt="Haziq Duha Zainul Ihsan"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                  Haziq Duha Zainul Ihsan
                </h3>
                <span className="text-gray-500  my-2  block">Back End Developer</span>

                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link target="_blank" to="https://github.com/Huzaisa">
                      <FontAwesomeIcon icon={faGithub} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      target="_blank"
                      to="https://www.linkedin.com/in/haziq-duha-zainul-ihsan-7680b322b"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.instagram.com/huzhiend/">
                      <FontAwesomeIcon icon={faInstagram} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg border shadow sm:flex ">
              <img
                className="w-full sm:max-w-52 sm:min-w-52  h-auto rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://raw.githubusercontent.com/DadangHawari/assets/main/sam.png"
                alt="Samuel"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">Samuel</h3>
                <span className="text-gray-500  my-2  block">Back End Developer</span>

                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link target="_blank" to="">
                      <FontAwesomeIcon icon={faGithub} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li className="">
                    <Link target="_blank" to="">
                      <FontAwesomeIcon icon={faLinkedin} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="">
                      <FontAwesomeIcon icon={faInstagram} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-5" />
          <h5 className="text-center  text-gray-900 text-xl  my-7 font-bold">Front-End</h5>
          <div className="grid gap-8 mb-6 md:grid-cols-2">
            <div className="items-center max bg-gray-50 rounded-lg border shadow sm:flex ">
              <img
                className="w-full sm:max-w-52 sm:min-w-52 h-auto rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://raw.githubusercontent.com/DadangHawari/assets/main/ddgh.jpg"
                alt="Muh. Dadang Hawari"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                  Muh. Dadang Hawari
                </h3>
                <span className="text-gray-500  my-2  block">Front End Developer</span>

                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link target="_blank" to="https://github.com/dadang-hawari">
                      <FontAwesomeIcon icon={faGithub} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li className="https://www.linkedin.com/in/muh-dadang-hawari/">
                    <Link target="_blank" to="">
                      <FontAwesomeIcon icon={faLinkedin} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.instagram.com/mohdadanghawari/">
                      <FontAwesomeIcon icon={faInstagram} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg border shadow sm:flex ">
              <img
                className="w-full sm:max-w-52 sm:min-w-52 h-auto rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://raw.githubusercontent.com/DadangHawari/assets/main/andry.jpg"
                alt="Andry Setiawan Manzanaris"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                  Andry Setiawan Manzanaris
                </h3>
                <span className="text-gray-500  my-2  block">Front End Developer</span>

                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link target="_blank" to="https://github.com/Andrysm06/">
                      <FontAwesomeIcon icon={faGithub} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li className="">
                    <Link target="_blank" to="">
                      <FontAwesomeIcon icon={faLinkedin} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.instagram.com/andrysm06/">
                      <FontAwesomeIcon icon={faInstagram} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg border shadow sm:flex ">
              <img
                className="w-full sm:max-w-52 sm:min-w-52 h-auto rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://raw.githubusercontent.com/DadangHawari/assets/main/shofiah.jpg"
                alt="Shofiah Hawa"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">Shofiah Hawa</h3>
                <span className="text-gray-500  my-2  block">Front End Developer</span>

                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link target="_blank" to="https://github.com/shofiahhawa">
                      <FontAwesomeIcon icon={faGithub} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.linkedin.com/in/shofiah-hawa-8210282a7/">
                      <FontAwesomeIcon icon={faLinkedin} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://instagram.com/shofiah.ha">
                      <FontAwesomeIcon icon={faInstagram} className="text-gray-500 h-5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
