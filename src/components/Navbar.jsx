import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '/assets/images/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed top-2 left-0 right-0 z-10 bg-transparent p-4 transition-all ${
        isSticky ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/*ini Logo nya */}
        <div className="text-black text-lg font-bold">
          <img src={Logo} alt="" className="h-12" />
        </div>

        {/* button untuk masuk*/}
        <ul className="flex space-x-4">
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-gray-900 py-2 px-5 w-28 rounded-xl flex items-center"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="h-4 w-3 mr-2" />
            Masuk
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
