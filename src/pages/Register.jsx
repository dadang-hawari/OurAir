import { useState } from "react";
import Image from "../../public/assets/images/cloud_ourair.webp";
import iconEyeSolid from "../../public/assets/icons/eye-solid.svg";
import iconEyeSolidSlash from "../../public/assets/icons/eye-slash-solid.svg";
import iconChevronLeft from "../../public/assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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

      <div className="relative w-1/2 h-full hidden md:block">
        <img src={Image} alt="Register visual" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-center md:w-1/2 h-full bg-blue-500 ">
        <div className="w-full max-w-sm">
          <h1 className="mb-5 text-black text-xl font-bold text-left">Daftar</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="username" className="text-left block mb-1 text-sm">
                Nama
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-4 mb-1 border rounded-xl focus:outline-none focus:border-secondary"
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="text-left block mb-1 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Contoh: johndee@gmail.com"
                className="w-full px-4 py-4 mb-1 border rounded-lg focus:outline-none focus:border-secondary"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phone-number" className="text-left block mb-1 text-sm">
                Nomor Telepon
              </label>
              <input
                id="phone-number"
                type="tel"
                placeholder="+62"
                className="w-full px-4 py-4 mb-1 border rounded-lg focus:outline-none focus:border-secondary"
                aria-label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="text-left block mb-1 text-sm">
                Buat Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat Password"
                  className="w-full px-4 py-4 mb-1 border rounded-lg focus:outline-none focus:border-secondary"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-0 top-0 p-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src={iconEyeSolidSlash} alt="Show/Hide Password" className="h-4" />
                  ) : (
                    <img src={iconEyeSolid} alt="Show/Hide Password" className="h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-4 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
                aria-label="Register"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
