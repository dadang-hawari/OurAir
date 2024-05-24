import React, { useState } from "react";
import Image from "../../public/fonts/iimage.png";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full">
        <img
          src={Image}
          alt="Reset Password visual"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center w-1/2 h-full bg-white p-4">
        <div className="w-full max-w-sm">
          <h1 className="mb-5 text-black text-xl font-bold text-left">
            Reset Password
          </h1>
          <form>
            <div className="mb-2">
              <label
                htmlFor="new-password"
                className="text-left block mb-1 text-sm"
              >
                Masukkan Password Baru
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="***"
                className="w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="text-left block mb-1 text-sm"
              >
                Ulangi Password Baru
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="***"
                className="w-full px-4 py-2 mb-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
