import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '/assets/images/ourair_logo.svg'
import Image from '/assets/images/cloud_ourair.webp'
import ButtonPrimary from '../components/ButtonPrimary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { loginUser } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '../components/common/Toast'
import { checkLocationState } from '../utils/checkLocationState'
import LoginGoogle from '../components/LoginGoogle'
import { Flip } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const prevPage = useSelector((state) => state?.notification?.prevPage)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const checkEmptyFields = () => {
    if (email?.length > 0) {
      setEmailError('')
    }
    if (password?.length > 0) {
      setPasswordError('')
    }
  }

  useEffect(() => {
    isSubmitted && checkEmptyFields()
  }, [email, password])

  useEffect(() => {
    checkLocationState(location, navigate)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setEmailError('')
    setPasswordError('')

    if (!email.trim() && !password.trim()) {
      setPasswordError('Masukkan Password')
      setEmailError('Masukkan Email Anda')
      return
    }

    if (!email.trim()) {
      setEmailError('Masukkan Email Anda')
      return
    }

    if (!password.trim()) {
      setPasswordError('Masukkan Password')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex?.test(email.trim())) {
      setEmailError('Masukkan Email yang valid')
      return
    }

    dispatch(loginUser(email, password, navigate, prevPage))
  }

  return (
    <div className="w-full md:flex h-screen justify-center ">
      <div
        className="relative w-1/2 h-full hidden xl:block bg-cover bg-center"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <img
          src={Logo}
          alt="Ourair"
          className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-96   w-full h-auto"
        />
      </div>
      <div className="flex items-center justify-center md:w-1/2 h-full px-5 md:px-0">
        <div className="w-full max-w-sm relative">
          <Link
            to="/"
            className="absolute -top-12 left-0 py-2  text-accent flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-2 h-auto " />
            <p className="text-sm">Beranda</p>
          </Link>
          <h1 className="mb-5 text-xl font-bold">Masuk</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Contoh: Jhondoe@gmail.com "
                className={`w-full input-primary outline-none  ${
                  emailError ? 'border-red-500 ' : 'focus:border-blue-500'
                }`}
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="text-red-500 text-xs">{emailError}</div>}
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link to="/lupa-password" className="text-accent text-sm my-2" tabIndex={-1}>
                  Lupa kata sandi
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  className={`w-full input-primary outline-none ${
                    passwordError ? 'border-red-500' : 'focus:border-blue-500'
                  }`}
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-0 top-0 py-[14px] px-1 rounded-e-xl"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-gray-400 h-[13px]"
                    width="32"
                    height="32"
                  />
                </button>
              </div>
              {passwordError && <div className="text-red-500 text-xs">{passwordError}</div>}
            </div>

            <ButtonPrimary text={'Masuk'} />
            <LoginGoogle />
          </form>
          <div className="text-center mt-4 text-sm">
            Belum punya akun?
            <Link to="/daftar" className="text-accent ml-1 font-[600]">
              Daftar disini
            </Link>
          </div>
        </div>
      </div>
      <Toast autoClose={5000} transition={Flip} />
    </div>
  )
}

export default Login
