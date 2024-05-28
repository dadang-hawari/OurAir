import React, { useState } from "react";
import Image from "../../public/assets/images/cloud_ourair.webp";
import iconEyeSolid from "../../public/assets/icons/eye-solid.svg";
import iconEyeSolidSlash from "../../public/assets/icons/eye-slash-solid.svg";
import Logo from "/assets/images/ourair_logo.svg";
import ButtonPrimary from "../components/ButtonPrimary";

const LupaPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [showConfirmPasswordMessage, setShowConfirmPasswordMessage] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true);
  };

  const handlePasswordBlur = () => {
    setShowPasswordRequirements(false);
  };

  const handleConfirmPasswordFocus = () => {
    setShowConfirmPasswordMessage(true);
  };

  const handleConfirmPasswordBlur = () => {
    setShowConfirmPasswordMessage(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError(false);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (newPassword !== confirmPassword || !passwordRegex.test(newPassword)) {
      setPasswordError(true);
      setIsPasswordChanged(false);
      return;
    }

    setIsPasswordChanged(true);
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
     <div className="w-full max-w-sm"> 
          <h1 className="mb-6 text-black text-xl font-bold text-left">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="new-password"
                className="text-left block mb-1 text-sm"
              >
                Masukkan Password Baru
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Masukkan Password Baru"
                  className={`w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  aria-label="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 p-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <img
                      src={iconEyeSolidSlash}
                      alt="Show/Hide Password"
                      className="h-4"
                    />
                  ) : (
                    <img
                      src={iconEyeSolid}
                      alt="Show/Hide Password"
                      className="h-4"
                    />
                  )}
                </button>
              </div>
              {showPasswordRequirements && (
                <div
                  className={`text-sm mt-1 ${
                    passwordError ? "text-red-500" : "text-green-500"
                  }`}
                >
                  Panjang kata sandi minimum adalah 8 karakter. Gabungkan kata
                  sandi dengan angka dan huruf.
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="text-left block mb-1 text-sm"
              >
                Ulangi Password Baru
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi Password"
                  className={`w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  aria-label="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={handleConfirmPasswordFocus}
                  onBlur={handleConfirmPasswordBlur}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 p-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <img
                      src={iconEyeSolidSlash}
                      alt="Show/Hide Password"
                      className="h-4"
                    />
                  ) : (
                    <img
                      src={iconEyeSolid}
                      alt="Show/Hide Password"
                      className="h-4"
                    />
                  )}
                </button>
              </div>
              {showConfirmPasswordMessage && (
                <div
                  className={`text-sm mt-1 ${
                    newPassword === confirmPassword
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {newPassword === confirmPassword
                    ? "Kata sandi cocok"
                    : "Kata sandi tidak cocok"}
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
                aria-label="Reset password"
              >
                Ubah Kata Sandi
              </button>
            </div>
          </form>
          {isPasswordChanged ? (
            <div className="mt-4">
              <p className="text-green-500 text-sm text-center">
                Reset password berhasil!
              </p>
            </div>
          ) : passwordError ? (
            <div className="mt-4">
              <p className="text-red-500 text-sm text-center">
                Reset password gagal!
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LupaPassword;
