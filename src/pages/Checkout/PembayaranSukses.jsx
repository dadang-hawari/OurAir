import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faChevronDown,
  faChevronRight,
  faIcons,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { data } from 'autoprefixer'
import DatePicker from 'react-multi-date-picker'
import { Link } from 'react-router-dom'

export default function PembayaranSukses() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('Semua Status')
  const [pemesan, setPemesan] = useState({
    data: {
      namaLengkap: '',
      namaKeluarga: '',
      nomorTelepon: '',
      email: '',
    },
  })
  const [penumpang, setPenumpang] = useState({
    data: {
      title: 'Mr.',
      namaLengkap: '',
      namaKeluarga: '',
      tanggalLahir: '',
      kewarganegaraan: '',
      ktpOrPasspor: '',
      negaraPenerbit: '',
      berlakuSampai: '',
    },
  })
  4
  const setDataPenumpang = (isi) => {
    setPenumpang(...data, isi)
  }
  const [namaLengkapPemesan, setNamaLengkapPemesan] = useState('')
  const [nomorTelepon, setNomorTelepon] = useState('')
  const [email, setEmail] = useState('')
  const [useCurrentEmail, setUseCurrentEmail] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const emailnow = useSelector((state) => state?.auth?.userData?.email)
  console.log('data', emailnow)
  ReactModal.setAppElement('#modal')

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl px-5 mx-auto mt-24">
        <div>
          <h1 className="text-xl cursor-default text-black flex items-center gap-x-2">
            <b>Isi Data Diri</b>
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            <b>Bayar</b>
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            <b>Selesai</b>
          </h1>
        </div>
        {/* Alert */}
        <div className="bg-green-soft text-white px-5 my-4 rounded-xl py-3">
          <p className="text-base text-center">Terima kasih atas pembayaran transaksi</p>
        </div>
        <div className="text-center mt-14 mb-5">
          <img
            src="/assets/images/pembayaran_sukses.webp"
            alt="Pembayaran sukses"
            width="204"
            height="208"
            className="mx-auto mb-3"
          />
          <div className="font-[600] text-sm text-center mb-5">
            <h2 className="text-secondary">Selamat!</h2>
            <h2>Anda belum melakukan pemesanan penerbangan</h2>
          </div>
          <button className="w-full max-w-[375px] mx-auto rounded-xl py-3 font-[600] bg-secondary text-white ">
            Terbitkan Tiket
          </button>
          <Link
            to="/"
            className="w-full max-w-[375px] block mx-auto rounded-xl py-3 mt-3 text-sm font-[600] bg-accent text-white "
          >
            Cari Penerbangan
          </Link>
        </div>
      </div>
    </div>
  )
}
