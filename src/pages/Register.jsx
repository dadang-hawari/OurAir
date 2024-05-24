import React, { useState } from "react";
import Image from "../../public/fonts/iimage.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full">
        <img
          src={Image}
          alt="Register visual"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center w-1/2 h-full bg-white p-4">
        <div className="w-full max-w-sm">
          <h1 className="mb-5 text-black text-xl font-bold text-left">
            Daftar
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="text-left block mb-1 text-sm"
              >
                Nama
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="phone-number"
                className="text-left block mb-1 text-sm"
              >
                Nomor Telepon
              </label>
              <input
                id="phone-number"
                type="tel"
                placeholder="+62"
                className="w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="text-left block mb-1 text-sm"
              >
                Buat Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Buat Password"
                className="w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
                aria-label="Register"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
