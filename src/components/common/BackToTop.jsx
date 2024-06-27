// src/components/BackToTopButton.js
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className="fixed bottom-7 right-7">
      <button
        onClick={scrollToTop}
        className={`bg-blue-500 text-white h-10 w-10  rounded-full shadow-lg focus:outline-none  
          transition-transform
          duration-200 ${visible ? 'scale-100' : 'scale-0'}`}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  )
}

export default BackToTopButton
