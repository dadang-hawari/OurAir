import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Footer from './Footer'
import Toast from '../components/common/Toast'
import { updateUser, updateProfile } from '../redux/actions/authAction'
import ScrollToTop from '../components/common/ScrollToTop'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function useInput(defaultValue = '') {
  const [state, setState] = useState(defaultValue)

  const onChange = (e) => {
    setState(e.target.value)
  }

  return [state, onChange]
}

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData)
  const token = useSelector((state) => state.auth.token)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(userData?.avatar || '')
  const [isEditing, setIsEditing] = useState(false)

  const [name, onNameChange] = useInput(() => userData?.name)
  const [phone, onPhoneChange] = useInput(() => userData?.phone_number || '')
  const [email, onEmailChange] = useInput(() => userData?.email || '')

  const dispatch = useDispatch()

  const onPictureChange = (e) => {
    const file = e.target.files[0]

    if (!file.type.startsWith('image')) {
      alert('File harus berupa gambar!')
      return
    }

    const displayUrl = URL.createObjectURL(file)

    setImageFile(file)
    setPreview(displayUrl)
  }

  const handleUpload = () => {
    if (imageFile) {
      dispatch(updateProfile(imageFile, token)).then((response) =>
        dispatch(updateUser(name, email, phone, token))
      )
    }
  }

  const handleRemove = () => {
    setImageFile(null)
    setPreview('')
  }

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) {
      toast('Mohon agar tidak mengosongkan inputan', {
        toastId: 'toastError',
        className: 'toast-error',
      })
      return
    }
    handleUpload()
    setIsEditing(false)
  }

  return (
    <>
      <div className="w-full max-w-3xl mx-auto  mt-20 px-5">
        <Navbar />

        <main className="w-full flex flex-col md:flex-row gap-10">
          <div className=" mt-5 w-full rounded-lg space-y-4">
            <div className="bg-accent rounded-lg text-white px-5 py-3 space-x-4">
              <Link to="/">
                <FontAwesomeIcon icon={faArrowLeft} className="h-4" />
              </Link>
              <span className="text-lg">Beranda</span>
            </div>
            <h2 className="text-xl font-bold">Ubah Data Profile</h2>
            <div className="w-full flex flex-col gap-5 sm:flex-row">
              <div className="w-max flex flex-col gap-0.5">
                <span className="text-primary font-semibold w-28 text-center">Foto Profil</span>
                <div className="flex justify-center flex-col items-center gap-4">
                  <img
                    src={preview ? preview : userData?.avatar_link}
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-full mx-auto border border-gray-300 object-cover object-center"
                  />
                  <label
                    htmlFor="foto-profil"
                    className={`bg-primary px-3 py-2 w-28 text-center  rounded-lg text-white cursor-pointer ${
                      isEditing ? 'block' : 'hidden'
                    }`}
                  >
                    Ubah Foto
                  </label>
                  <input
                    type="file"
                    id="foto-profil"
                    accept="image/png, image/jpeg"
                    onChange={onPictureChange}
                    max={-1}
                    className="hidden"
                  />
                </div>
              </div>
              <form
                className="space-y-2 w-full"
                onSubmit={(e) => {
                  e?.preventDefault()
                  handleSave()
                }}
              >
                <fieldset className="flex flex-col gap-0.5">
                  <label htmlFor="nama-lengkap" className="text-primary font-semibold">
                    Nama Lengkap
                  </label>
                  <input
                    id="nama-lengkap"
                    type="text"
                    placeholder="John Doe"
                    className="p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                    value={name}
                    onChange={onNameChange}
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-0.5">
                  <label htmlFor="nomor-telepon" className="text-primary font-semibold">
                    Nomor Telepon
                  </label>
                  <input
                    id="nomor-telepon"
                    type="text"
                    placeholder="+6212345678910"
                    className="p-2 border border-gray-300 rounded-md"
                    disabled={!isEditing}
                    value={phone}
                    onChange={onPhoneChange}
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-0.5">
                  <label htmlFor="email" className="text-primary font-semibold">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="johndoe@email.co"
                    className="p-2  rounded-md"
                    disabled
                    value={email}
                    onChange={onEmailChange}
                  />
                </fieldset>
                <div className="w-full flex justify-center items-center gap-2 flex-wrap pt-5">
                  <button
                    disabled={isEditing}
                    type="button"
                    className="border-2 border-primary text-primary px-10 py-3 rounded-lg text-lg disabled:opacity-50"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    disabled={!isEditing}
                    type="submit"
                    className="bg-primary border-2 border-primary text-white px-10 py-3 rounded-lg text-lg disabled:opacity-50"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <ScrollToTop />
        <Toast margin="mt-10" />
      </div>
      <Footer />
    </>
  )
}
