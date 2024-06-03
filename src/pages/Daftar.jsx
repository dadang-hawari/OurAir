import { useEffect, useState } from 'react'
import Image from '/assets/images/cloud_ourair.webp'
import Logo from '/assets/images/ourair_logo.svg'
import ButtonPrimary from '../components/ButtonPrimary'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  passWithNumAndLetter,
  isMinPassLengthEight,
  passwordMedium,
  passwordStrong,
  combineWithNumAndLetter,
  minPassLengthEight,
} from '../utils/passRegex'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Toast from '../components/common/Toast'
import { useDispatch } from 'react-redux'
import { registUser } from '../redux/actions/authAction'
import { isEmailValid } from '../utils/emailRegex'

const Daftar = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [isPassEmpty, setIsPassEmpty] = useState(false)
  const [isPhoneNumEmpty, setIsPhoneNumEmpty] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPasswordMedium, setIsPasswordMedium] = useState(false)
  const [isPasswordStrong, setIsPasswordStrong] = useState(false)
  const [passMeter, setPassMeter] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Set state empty fields
  const setEmptyFields = () => {
    setIsUsernameEmpty(username.trim().length === 0)
    setIsEmailEmpty(email.trim().length === 0)
    setIsPassEmpty(password.trim().length === 0)
    setIsPhoneNumEmpty(phoneNumber.trim().length === 0)
  }

  // Check empty fields
  const checkEmptyFields = () => {
    if (
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !phoneNumber.trim()
    ) {
      return false
    }
    return true
  }

  useEffect(() => {
    // Eksekusi setEmptyFields() jika submitted bernilai true
    isSubmitted && setEmptyFields()
  }, [username, password, email, phoneNumber])

  useEffect(() => {
    setIsPasswordMedium(passwordMedium(password))
    setIsPasswordStrong(passwordStrong(password))
  }, [password])

  const showPassMeter = () => {
    setPassMeter(true)
    isPassMeterStrong()
  }

  const hidePassMeter = () => {
    if (password.length > 0) {
      setPassMeter(true)
      isPassMeterStrong()
    } else setPassMeter(false)
  }

  const isPassMeterStrong = () => {
    if (isPasswordMedium && isPasswordStrong) {
      return <span className="text-green-500">Password kuat</span>
    } else if (isPasswordMedium) {
      return (
        <span className="text-orange-500 text-[10px] sm:text-xs">
          Password Sedang, gunakan simbol untuk password yang kuat
        </span>
      )
    } else {
      return (
        <span className={passMeter ? 'text-red-500' : 'hidden'}>
          Password Lemah
        </span>
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmptyFields()
    setIsSubmitted(true)

    if (
      checkEmptyFields() &&
      isEmailValid(email) &&
      combineWithNumAndLetter(password) &&
      minPassLengthEight(password)
    ) {
      dispatch(registUser(phoneNumber, username, email, password, navigate))
    }

    console.log('DaftarRegistering:', {
      username,
      email,
      phoneNumber,
      password,
    })
  }

  return (
    <div className="w-full h-screen md:flex justify-center">
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
        <div className="w-full max-w-sm">
          <h1 className="mb-2 text-black text-xl font-bold text-left">
            Daftar
          </h1>
          <form onSubmit={() => handleSubmit()}>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="text-left block mb-1 text-sm"
              >
                Nama
                <span className="text-red-500" title="required">
                  *
                </span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nama Lengkap"
                autoComplete="off"
                className={`input-primary  ${
                  isUsernameEmpty
                    ? 'border-red-500 focus:border-red-500'
                    : 'focus:border-accent '
                }'}`}
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p
                className={`${
                  isUsernameEmpty ? 'block' : 'hidden'
                }  text-xs  text-red-500`}
              >
                Mohon inputkan nama lengkap
              </p>
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="text-left block mb-1 text-sm">
                Email
                <span className="text-red-500" title="required">
                  *
                </span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Contoh: johndee@gmail.com"
                autoComplete="off"
                className={`input-primary ${
                  isEmailEmpty
                    ? 'border-red-500 focus:border-red-500'
                    : 'focus:border-accent'
                }`}
                aria-label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p
                className={`${
                  isEmailEmpty ? 'block' : 'hidden'
                }  text-xs text-red-500`}
              >
                Mohon inputkan alamat email Anda
              </p>
            </div>
            <div className="mb-2">
              <label
                htmlFor="phone-number"
                className="text-left block mb-1 text-sm"
              >
                Nomor Telepon
                <span className="text-red-500" title="required">
                  *
                </span>
              </label>
              <input
                id="phone-number"
                type="number"
                placeholder="+62"
                className={`input-primary ${
                  isPhoneNumEmpty
                    ? 'border-red-500 focus:border-red-500'
                    : 'focus:border-accent'
                }`}
                aria-label="Phone Number"
                value={phoneNumber}
                autoComplete="off"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <p
                className={`${
                  isPhoneNumEmpty ? 'block' : 'hidden'
                }  text-xs text-red-500`}
              >
                Mohon inputkan nomor telepon
              </p>
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="text-left block mb-1 text-sm"
              >
                Buat Password
                <span className="text-red-500" title="required">
                  *
                </span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  onFocus={showPassMeter}
                  onBlur={hidePassMeter}
                  autoComplete="off"
                  placeholder="Buat Password"
                  className={`input-primary ${
                    isPassEmpty
                      ? 'border-red-500 focus:border-red-500'
                      : 'focus:border-accent'
                  }`}
                  aria-label="Password"
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
                <p
                  className={`${
                    isPassEmpty ? 'block' : 'hidden'
                  }  text-xs text-red-500`}
                >
                  Mohon inputkan password
                </p>
                <div
                  className={`text-xs transition-[height] duration-400 rounded-md ${
                    passMeter ? 'h-2 mt-2 mb-5' : 'h-0'
                  }`}
                >
                  <div className="w-full flex justify-between h-full">
                    <div className="bg-red-500 w-full rounded-s-md"></div>
                    <div
                      className={`${
                        isPasswordMedium && 'bg-orange-500'
                      } w-full`}
                    ></div>
                    <div
                      className={`${
                        isPasswordStrong && 'bg-green-500'
                      } w-full rounded-e-md`}
                    ></div>
                  </div>
                  <div className="block">{isPassMeterStrong()}</div>
                </div>
                <div className="pass-check mt-2">
                  <div className={isMinPassLengthEight('style', password)}>
                    <span className="text-xs">
                      <FontAwesomeIcon
                        icon={isMinPassLengthEight('icon', password)}
                      />{' '}
                      Minimal panjang password 8 karakter
                    </span>
                  </div>
                  <div className={passWithNumAndLetter('style', password)}>
                    <div className="text-xs">
                      <FontAwesomeIcon
                        icon={passWithNumAndLetter('icon', password)}
                      />{' '}
                      Kombinasikan password dengan huruf dan angka
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ButtonPrimary
                onClick={handleSubmit}
                text={'Daftar'}
                className={'mt-1'}
              />
            </div>
          </form>
          <div className="text-sm mt-3 text-center">
            <p>
              Sudah punya akun?
              <Link to="/login" className="text-accent font-[600]">
                {' '}
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  )
}

export default Daftar
