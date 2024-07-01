import { faArrowLeft, faCog, faPencil, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
export default function Sidebar() {
  const items = [{ label: 'Ubah Profil', icon: faPencil, to: '#ubah' }]

  return (
    <aside className="w-full md:w-max h-full">
      {items.map(({ label, icon, to }) => (
        <Link
          key={to}
          to={to}
          className="flex items-center gap-4 w-full px-2 py-4 border-b border-gray-300"
        >
          <FontAwesomeIcon icon={icon} className="text-accent size-6" />
          <span className="text-lg text-nowrap font-semibold">{label}</span>
        </Link>
      ))}

      <div className="flex justify-center items-center p-2"></div>
    </aside>
  )
}
