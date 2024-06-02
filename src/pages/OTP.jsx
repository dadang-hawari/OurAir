import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import ButtonPrimary from "../components/ButtonPrimary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrementTimerOtp, resetTimerOtp } from "../redux/reducers/otpReducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Toast from "../components/common/Toast";
import { toast } from "react-toastify";

import { checkLocationState } from "../utils/checkLocationState";
import { sendVerifyOtp, verifyOTP } from "../redux/actions/authAction";

export default function OTP() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state?.otp?.email);
  const timer = useSelector((state) => state?.otp?.timerOtp);
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(timer > 0);

  const checkEmail = () => {
    if (!email) navigate("/");
  };

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
    checkLocationState(location, navigate);
    checkEmail();
  }, []);

  useEffect(() => {
    if (isTimerActive) {
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isTimerActive, timer]);

  // Kirim ulang OTP
  const handleResendOTP = () => {
    startTimer();
    dispatch(sendVerifyOtp(email));
  };

  // Handle OTP
  const handleSubmit = () => {
    if (otp.length < 6) {
      toast("Mohon untuk mengisi seluruh OTP", { className: "toast-error", toastId: "toastError" });
      return;
    }
    dispatch(verifyOTP(email, otp, navigate));
    console.log("OTP yang dimasukkan:", otp);
  };

  return (
    <div className="mx-auto mt-28 md:mt-4 p-5">
      <div className="max-w-md mx-auto text-center relative">
        <Link to="/daftar" className="absolute -top-12 left-0 md:-left-12 p-2 text-accent flex items-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="w-2 h-auto " />
          <p className="text-base  font-medium">Kembali</p>
        </Link>

        <h2 className="text-2xl font-bold mt-10">Masukkan OTP</h2>

        <div className="otp grid gap-4 mt-10 justify-items-center w-full text-sm">
          <p className="mb-5 tracking-wide leading-5">
            Ketik 6 digit kode yang telah dikirimkan ke email <b>{email}</b>
          </p>
          <OTPInput value={otp} onChange={setOtp} numInputs={6} inputType="number" renderInput={(props) => <input {...props} />} />
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
        <Toast />
      </div>
    </div>
  );
}
