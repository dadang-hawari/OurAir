import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { authGoogleUser } from '../../redux/actions/authAction'
import Toast from '../common/Toast'

export default function LoadingGoogle() {
  const dispatch = useDispatch()
  const { token } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(authGoogleUser(token, navigate))
  }, [])

  return (
    <div className="bg-softer-blue h-screen flex flex-col justify-center items-center px-5 text-center">
      <img src="/assets/images/ourair_logo.svg" alt="" className="w-40 ms-5" />
      <div className="text-6xl font-bold text-[#13587B] animate-bounce tracking-widest ">....</div>
      <div className=" font-[600] text-[#13587B] ">
        Mohon tunggu, Anda akan diarahkan ke Beranda
      </div>
      <Toast />
    </div>
  )
}
