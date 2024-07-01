import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function Header({ title }) {
  return (
    <header className="w-full mt-28">
      <div className="bg-accent rounded-lg text-white px-5 py-3 space-x-4">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="h-4" />
        </Link>
        <span className="text-lg">Data Diri</span>
      </div>
    </header>
  )
}
