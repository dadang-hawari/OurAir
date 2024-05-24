import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../public/fonts/iimage.png";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrPhoneError, setEmailOrPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailOrPhoneError("");
    setPasswordError("");

    if (!emailOrPhone) {
      setEmailOrPhoneError("Masukkan Email atau No telepon");
      return;
    }

    if (!password) {
      setPasswordError("Masukkan Password");
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
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setEmailOrPhoneError("Masukkan Email atau No telepon yang valid");
      return;
    }

    try {
      const response = { emailOrPhone, password };

      if (response.success) {
        navigate("/");
      } else {
        if (response.message.includes("email")) {
          setEmailOrPhoneError(
            "Alamat email atau nomor telepon tidak terdaftar!"
          );
        } else if (response.message.includes("password")) {
          setPasswordError("Maaf, kata sandi anda salah");
        }
      }
    } catch (err) {
      setEmailOrPhoneError("Email atau nomor telepon tidak terdaftar");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          src={Image}
          alt="Login visual"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center w-1/2 bg-white p-4">
        <div className="w-full max-w-sm">
          <h1 className="mb-5 text-xl font-bold">Masuk</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="emailOrPhone" className="block text-sm mb-1">
                Email/No telepon
              </label>
              <input
                id="emailOrPhone"
                type="text"
                placeholder="Contoh: Jhondoe@gmail.com "
                className={`w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring ${
                  emailOrPhoneError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {emailOrPhoneError && (
                <div className="text-red-500 text-sm">{emailOrPhoneError}</div>
              )}
            </div>
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link
                  to="/ForgotPassword"
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  Lupa kata sandi
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                className={`w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}
            </div>
            <div>
              <input
                type="submit"
                value="Masuk"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
              />
            </div>
          </form>
          <div className="text-center mt-4">
            Belum punya akun?
            <Link
              to="/register"
              className="text-blue-500 ml-1 hover:text-blue-600"
            >
              Daftar disini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
