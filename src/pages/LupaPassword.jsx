import { useEffect, useState } from "react";
import Logo from "/assets/images/ourair_logo.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/actions/authAction";

const LupaPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const checkEmail = () => {
    setIsEmailEmpty(email.trim().length === 0);
  };

  useEffect(() => {
    // eksekusi jika state isSubmitted true
    isSubmitted && checkEmail();
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setIsSubmitted(true);
    checkEmail();
  };

  return (
    <div className="w-full flex h-screen justify-center items-center">
      <div className="flex items-center justify-center w-fit  relative h-fit m-auto px-5 pb-8 pt-14 border rounded-lg md:px-5 text-gray-900">
        <div className="w-full max-w-sm">
          <Link
            to="/login"
            className="absolute top-2 left-2 p-2 text-accent flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-2 h-auto " />
            <p className="text-sm font-medium">Kembali</p>
          </Link>

          <img src={Logo} alt="Our Air" className="w-full h-auto max-w-28 mx-auto" />
          <h1 className="my-4 text-3xl text-center font-bold">Reset Password</h1>
          <p className="leading-5 text-xs">
            Kami akan mengirimkan Anda sebuah email berisikan link, yang digunakan untuk melakukan
            reset password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="my-6">
              <label htmlFor="email" className="text-left block mb-1 text-sm font-bold ">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan Alamat Email Anda"
                className={`input-primary text-xs ${
                  isEmailEmpty ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"
                }`}
                value={email}
                aria-label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={isEmailEmpty ? `text-xs block text-red-500` : `hidden`}>
                Mohon inputkan email anda
              </p>
            </div>
            <div>
              <ButtonPrimary onClick={handleSubmit} text="Kirim" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LupaPassword;
