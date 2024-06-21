import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faArrowLeft, faCog, faPencil, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Footer from './Footer'
import Toast from '../components/common/Toast'
import { updateUser } from '../redux/actions/authAction'

function Header({ title }) {
  return (
    <header className="w-full p-6 shadow-md">
      <div className="max-w-screen-lg mx-auto space-y-4">
        <h1 className="text-xl font-bold">{title || 'Header'}</h1>
        <div className="bg-accent rounded-lg text-white px-5 py-3 space-x-4">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="h-4" />
          </Link>
          <span className="text-lg">Beranda</span>
        </div>
      </div>
    </header>
  )
}

function Sidebar() {
  const items = [
    { label: 'Ubah Profil', icon: faPencil, to: '#ubah' },
    { label: 'Pengaturan Akun', icon: faCog, to: '#pengaturan' },
  ]

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
      <Link to={'/'} className="flex items-center gap-4 w-full px-2 py-4 border-b border-gray-300">
        <FontAwesomeIcon icon={faDoorOpen} className="text-accent size-6" />
        <span className="text-lg text-nowrap font-semibold">Keluar</span>
      </Link>
      <div className="flex justify-center items-center p-2"></div>
    </aside>
  )
}

function useInput(defaultValue = '') {
  const [state, setState] = useState(defaultValue)

  const onChange = (e) => {
    setState(e.target.value)
  }

  return [state, onChange]
}

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData)

  console.log({ userData })

  const [preview, setPreview] = useState('')
  const [imageFile, setImageFile] = useState(null)
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
    // upload gambar (variabel imageFile) ke API
    console.log({ imageFile })
  }

  const handleRemove = () => {
    setImageFile(null)
    setPreview('')
  }

  const handleSave = () => {
    dispatch(updateUser(name, email, phone, token))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle API / Redux dispatch
    setIsEditing(false)
    console.log(`${name} - ${phone} - ${email}`)
    toast.success(`Data anda telah berhasil disimpan!`)
  }

  return (
    <div className="mt-10 space-y-10">
      <Header title="Akun" />
      <main className="mt-10 w-full max-w-screen-lg mx-auto flex flex-col md:flex-row gap-10">
        <Sidebar />
        <div className="shadow-md px-4 py-10 w-full rounded-lg space-y-4">
          <h2 className="text-xl font-bold">Ubah Data Profil</h2>
          <span className="block rounded-t-lg text-lg text-white w-full px-4 py-2 bg-accent">
            Data Diri
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-primary font-semibold">Foto Profil</span>
            <div className="flex items-center gap-4">
              <img
                src={preview}
                alt="Profile Picture"
                className="size-12 rounded-full border border-gray-300 object-cover object-center"
              />
              <label
                htmlFor="foto-profil"
                className="bg-primary px-3 py-2 rounded-lg text-white cursor-pointer"
              >
                Pilih Foto
              </label>
              <input
                type="file"
                id="foto-profil"
                accept="image/png, image/jpeg"
                onChange={onPictureChange}
                className="hidden"
              />
              {imageFile !== null && (
                <>
                  <button
                    disabled={!imageFile}
                    className="px-3 py-2 rounded-lg bg-red-600 text-white disabled:cursor-default disabled:opacity-50"
                    onClick={handleRemove}
                  >
                    Hapus Foto
                  </button>
                </>
              )}
            </div>
          </div>
          <form className="space-y-2" onSubmit={handleSubmit}>
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
                className="p-2 border border-gray-300 rounded-md"
                disabled={!isEditing}
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
                onClick={handleSave}
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
