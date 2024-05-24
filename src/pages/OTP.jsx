import { useEffect, useState, useCallback } from "react";
import OTPInput from "react-otp-input";
import ButtonPrimary from "../components/ButtonPrimary";
import iconChevronLeft from "../../public/assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";

export default function OTP() {
  const emailSementara = "J***@gmail.com";
  const [timer, setTimer] = useState(10);
  const [otp, setOtp] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(true);

  const startTimer = useCallback(() => {
    setIsTimerActive(true);
    setTimer(10);
  }, []);

  const updateTimer = () => {
    setTimer((prevTimer) => {
      if (prevTimer <= 1) {
        setIsTimerActive(false);
        return 10;
      }
      return prevTimer - 1;
    });
  };

  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const handleResendOTP = useCallback(() => {
    console.log("Mengirim ulang OTP...");
    startTimer();
  }, [startTimer]);

  const handleSubmit = () => {
    if (otp.length < 5) alert("mohon untuk mengisih seluruh otp");
    console.log("OTP yang dimasukkan:", otp);
  };

  return (
    <div className="max-w-[668px] w-full p-5 relative mt-[110px] mx-auto ">
      <div className="max-w-[568px] w-full mx-auto md:text-left text-center">
        <Link className="absolute top-0 -left-0 p-2 flex gap-x-2 ">
          <img src={iconChevronLeft} alt="Back" className="w-[8px] h-auto " />
          <p className="text-base text-[#3e8ed0] font-medium">Kembali</p>
        </Link>
        <h2 className="text-[24px] font-bold mt-10">Masukkan OTP</h2>
        <div className="otp grid gap-y-4 mt-10 justify-items-center w-full grid-cols-1 text-sm">
          <p className=" mb-[20px] ">
            Ketik 6 digit kode yang dikirimkan ke <b> {emailSementara}</b>
          </p>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={5}
            inputType="number"
            renderInput={(props) => <input {...props} />}
          />

          <div className="mt-6 mb-20 font-medium">
            {isTimerActive ? (
              <p className="cursor-default block text-gray-600">
                Kirim Ulang OTP dalam {timer} detik
              </p>
            ) : (
              <button onClick={handleResendOTP} className=" text-red-600">
                Kirim Ulang OTP
              </button>
            )}
          </div>
          <ButtonPrimary onClick={handleSubmit} text={"Simpan"} />
        </div>
      </div>
    </div>
  );
}
