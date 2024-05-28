import { useState } from "react";
import Image from "/assets/images/cloud_ourair.webp";
import Logo from "/assets/images/ourair_logo.svg";
import iconChevronLeft from "/assets/icons/chevron-left.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { passWithNumAndLetter, isMinPassLengthEight } from "../utils/passRegex";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Toast from "../components/common/Toast";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Tautan Verifikasi telah dikirim!", { className: "success-toast" });
    setTimeout(() => {
      // buat navigate ke otp
    }, 2000);
    console.log("Registering:", {
      username,
      email,
      phoneNumber,
      password,
    });
  };

  return (
    <div className="w-full h-screen md:flex justify-center">
      <Link to="/login" className="absolute -top-12 left-0 md:-left-12 p-2 flex items-center gap-2">
        <img src={iconChevronLeft} alt="Kembali" className="w-2 h-auto" />
        <p className="text-base text-accent font-medium">Kembali</p>
      </Link>

      <div
        className="relative w-1/2 h-full hidden xl:block bg-cover bg-right"
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
          <h1 className="mb-5 text-black text-xl font-bold text-left">Daftar</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="username" className="text-left block mb-1 text-sm">
                Nama
                <span className="text-red-500" title="required">
                  *
                </span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nama Lengkap"
                className="input-daftar"
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
                className="input-daftar"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phone-number" className="text-left block mb-1 text-sm">
                Nomor Telepon
                <span className="text-red-500" title="required">
                  *
                </span>
              </label>
              <input
                id="phone-number"
                type="tel"
                placeholder="+62"
                className="input-daftar"
                aria-label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="text-left block mb-1 text-sm">
                Buat Password
                <span className="text-red-500" title="required">
                  *
                </span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat Password"
                  className="input-daftar"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-0 top-0 py-[14px] px-1 rounded-e-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-gray-400 h-[13px]"
                    width="32"
                    height="32"
                  />
                </button>
                <div className="text-xs mt-1">
                  <p className={isMinPassLengthEight("style", password)}>
                    <FontAwesomeIcon icon={isMinPassLengthEight("icon", password)} /> Minimal
                    panjang password 8 karakter
                  </p>

                  <p className={passWithNumAndLetter("style", password)}>
                    <FontAwesomeIcon icon={passWithNumAndLetter("icon", password)} /> Kombinasikan
                    password dengan huruf dan angka
                  </p>
                </div>
              </div>
            </div>
            <div>
              <ButtonPrimary onClick={handleSubmit} text={"Daftar"} className={"mt-5"} />
            </div>
          </form>
          <div className="text-sm mt-5 text-center">
            <p>
              Sudah punya akun?
              <Link to="/login" className="text-accent">
                {" "}
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default Register;
