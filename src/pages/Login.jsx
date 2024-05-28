import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/assets/images/ourair_logo.svg";
import Image from "/assets/images/cloud_ourair.webp";
import ButtonPrimary from "../components/ButtonPrimary";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Masukkan Email Anda");
      return;
    }

    if (!password) {
      setPasswordError("Masukkan Password Password");
      return;
    }

    const passwordRegex = /^[A-Z].{7,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password harus terdiri dari minimal 8 karakter dan diawali dengan huruf besar."
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,12}$/;
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      setEmailError("Masukkan Email atau No telepon yang valid");
      return;
    }

    try {
      const response = { email, password };

      if (response.success) {
        navigate("/");
      } else {
        if (response.message.includes("email")) {
          setEmailError("Alamat email atau nomor telepon tidak terdaftar!");
        } else if (response.message.includes("password")) {
          setPasswordError("Maaf, kata sandi anda salah");
        }
      }
    } catch (err) {
      setEmailError("Email atau nomor telepon tidak terdaftar");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full md:flex h-screen justify-center">
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
        <div className="w-full max-w-sm"> <h1 className="mb-5 text-xl font-bold">Masuk</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Contoh: Jhondoe@gmail.com "
                className={`w-full input-daftar outline-none  ${
                  emailError ? "border-red-500 " : "focus:border-blue-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
            </div>
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link to="/lupa-password" className="text-blue-500 hover:text-blue-600 text-sm my-2">
                  Lupa kata sandi
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                className={`w-full input-daftar outline-none ${
                  passwordError ? "border-red-500" : "focus:border-blue-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
            </div>

            <ButtonPrimary text={"Masuk"}/>

          </form>
          <div className="text-center mt-4 text-sm">
            Belum punya akun?
            <Link to="/daftar" className="text-blue-500 ml-1 font-[600] hover:text-blue-600">
              Daftar disini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
