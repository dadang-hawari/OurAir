import Navbar from '../Navbar'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import mainBackground from '/assets/images/header_background.webp'
import smBackground from '/assets/images/header-sm.webp'
import CardHeader from './CardHeader'
export default function Header() {
  const [width, setWidth] = useState(1280)

  const handleBackground = () => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }

  useEffect(() => {
    handleBackground()
  }, [])

  return (
    <>
      <Navbar />
      <div className="h-86 relative">
        <img src={width < 1250 ? smBackground : mainBackground} alt="Pantai" className="w-full h-[362px] xl:h-auto 2xl:max-h-96 select-none object-cover " />
        <div className="absolute top-72 max-w-5xl w-11/12 h-fit px-4 pt-4 pb-6 md:p-6 xl:p-8 rounded-xl border bg-white left-1/2 -translate-x-1/2">
          <CardHeader />
        </div>
      </div>
    </>
  )
}
