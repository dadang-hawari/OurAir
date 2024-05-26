import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import ButtonPrimary from "../components/ButtonPrimary";
import iconChevronLeft from "../../public/assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrementTimerOtp, resetTimerOtp } from "../redux/reducers/otpReducers";

export default function OTP() {
  const email = "J***@gmail.com";
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.otp.timerOtp);
  const [otp, setOtp] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Memulai timer pengiriman ulang OTP
  const startTimer = () => {
    setIsTimerActive(true);
    dispatch(resetTimerOtp(10));
  };

  // Memperbarui timer pengiriman ulang OTP
  const updateTimer = () => {
    if (timer <= 1) {
      setIsTimerActive(false);
      dispatch(resetTimerOtp(10));
    } else {
      dispatch(decrementTimerOtp());
    }
  };

  useEffect(() => {
    // Atur pemanggilan function setiap 1 detik
    const activateTimer = () => {
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    };

    if (isTimerActive) {
      const cleanup = activateTimer();
      return cleanup;
    }
  }, [isTimerActive, timer]);

  // Kirim ulang OTP
  const handleResendOTP = () => {
    console.log("Mengirim ulang OTP...");
    startTimer();
  };

  // Handle OTP
  const handleSubmit = () => {
    if (otp.length < 6) {
      alert("Mohon untuk mengisi seluruh OTP");
      return;
    }
    console.log("OTP yang dimasukkan:", otp);
  };

  return (
    <div className="mx-auto mt-28 md:mt-4 p-5">
      <div className="max-w-md mx-auto text-center md:text-left relative">
        <Link to="/" className="absolute -top-12 left-0 md:-left-12 p-2 flex items-center gap-2">
          <img src={iconChevronLeft} alt="Back" className="w-2 h-auto" />
          <p className="text-base text-accent font-medium">Kembali</p>
        </Link>

        <h2 className="text-2xl font-bold mt-10">Masukkan OTP</h2>

        <div className="otp grid gap-4 mt-10 justify-items-center w-full text-sm">
          <p className="mb-5">
            Ketik 6 digit kode yang dikirimkan ke <b>{email}</b>
          </p>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType="number"
            renderInput={(props) => <input {...props} />}
          />
          <div className="mt-6 mb-20 font-medium">
            {isTimerActive ? (
              <p className="text-gray-600 cursor-default">Kirim Ulang OTP dalam {timer} detik</p>
            ) : (
              <button onClick={handleResendOTP} className="text-red-600">
                Kirim Ulang OTP
              </button>
            )}
          </div>
          <ButtonPrimary onClick={handleSubmit} text="Simpan" />
        </div>
      </div>
    </div>
  );
}
