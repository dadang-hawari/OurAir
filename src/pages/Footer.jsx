// src/components/Footer.js
import Image from "../../public/assets/images/logoFooter.webp";

const Footer = () => {
  return (
    <footer className="bg-blue-400 p-16">
      <div className="flex flex-col md:flex-row justify-between">
        <div className=" items-center text-black text-lg font-bold">
          <img src={Image} alt="Logo Footer" className="h-14" />
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className=" text-2xl font-bold text-white ">OurAir</h3>
          <p className="text-sm">Beranda</p>
          <p className="text-sm">Tentang Kami</p>
          <p className="text-sm">Semua Penerbangan</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold text-white">Credits</h3>
          <p className="text-sm">Beranda</p>
          <p className="text-sm">Tentang Kami</p>
          <p className="text-sm">Semua Penerbangan</p>
        </div>
        <div className="mb-4 md:mb-0 text-white">
          <h3 className="text-2xl font-bold">Ikuti Kami</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
