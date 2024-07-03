import React, { useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import BackToTopButton from '../components/common/BackToTop'
import ScrollToTop from '../components/common/ScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { getDonation } from '../redux/actions/sdgsAction'
import { Link } from 'react-router-dom'
export default function SDSGs() {
  const sdgsDonation = useSelector((state) => state?.sdgs)
  const totalDonation = sdgsDonation?.totalDonation?.monthlyDonations[0]?.total_donation
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDonation())
  }, [])

  return (
    <>
      <Navbar />
      <div className="w-full max-w-2xl mx-auto mt-32 px-5">
        <h1 className="text-2xl text-center font-bold mb-3">
          Berdonasi untuk Sustainable Development Goals (SDGs)
        </h1>
        <img
          src="https://raw.githubusercontent.com/DadangHawari/assets/main/Sustainable_Development_Goals.webp"
          alt="sdgs"
          className="w-full max-w-2xl mx-auto h-full"
        />
        <i className="text-center block text-xs ">
          sumber:{' '}
          <a
            className="text-blue-500"
            href="https://id.wikipedia.org/wiki/Tujuan_Pembangunan_Berkelanjutan#/media/Berkas:Sustainable_Development_Goals.svg"
          >
            Wikipedia
          </a>
        </i>
        <p className="leading-6 mt-5">
          SDGs adalah serangkaian tujuan global yang ditetapkan oleh PBB di tahun 2015. Bertujuan
          untuk mengakhiri kemiskinan, kelaparan, meningkatkan kualitas pendidikan dan memastikan
          bahwa semua orang memiliki kesempatan untuk hidup sejahtera dan damai. Dengan setiap
          donasi Anda, Anda turut berkontribusi dalam upaya global untuk mencapai Sustainable
          Development Goals (SDGs).
        </p>
        <h2 className="text-xl font-bold mt-4 mb-2">Bagaimana OurAir berkontribusi pada SDGs</h2>

        <img
          src="https://raw.githubusercontent.com/DadangHawari/assets/main/target-donasi.jpg"
          alt="target donasi"
          className="max-w-72 w-full mx-auto h-full"
        />
        <h3 className="font-bold">1. No Poverty</h3>
        <p className="leading-6 mb-2">
          {' '}
          Memberikan bantuan langsung kepada keluarga atau individu yang hidup di bawah garis
          kemiskinan, seperti bantuan tunai, perbaikan rumah, atau penyediaan kebutuhan dasar.
        </p>
        <h3 className="font-bold">2. Zero Hunger </h3>
        <p className="leading-6 mb-2">
          Membantu mendukung bank makanan dan program distribusi makanan untuk mereka yang
          membutuhkan, memastikan bahwa tidak ada yang kelaparan.
        </p>
        <h3 className="font-bold">3. Good Health and Well-Being </h3>
        <p className="leading-6 mb-2">
          Mendukung penyediaan layanan kesehatan gratis atau bersubsidi bagi komunitas yang kurang
          terlayani, termasuk klinik keliling dan kampanye kesehatan.
        </p>
        <h3 className="font-bold">4. Quality Education </h3>
        <p className="leading-6 mb-2">
          Donasi untuk pembangunan dan perbaikan infrastruktur pendidikan, termasuk kelas,
          perpustakaan, dan fasilitas teknologi.
        </p>

        <h2 className="text-xl font-bold mt-4 mb-2">Fitur Donasi</h2>

        <p className="leading-6">
          Fitur donasi dapat Anda gunakan pada halaman checkout, dimana untuk pilihan donasi minimal
          Rp. 10.000 hingga Rp. 1.000.000.
        </p>
        <img
          src="https://raw.githubusercontent.com/DadangHawari/assets/main/fitur-donasi.png"
          alt="fitur donasi"
          className=" w-auto h-auto  mx-auto"
        />
        <h2 className="font-bold text-xl text-center">Donasi terkumpul saat ini:</h2>
        <b className="text-5xl block text-center">
          IDR {parseInt(totalDonation)?.toLocaleString('id-ID')}
        </b>

        <Link
          to="/"
          className="block text-center mt-10 bg-secondary text-white max-w-80 py-5 mx-auto rounded-md"
        >
          Cari Penerbangan Sekarang
        </Link>
      </div>
      <BackToTopButton />
      <ScrollToTop />

      <Footer />
    </>
  )
}
