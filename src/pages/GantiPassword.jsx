import { useEffect, useState } from "react";
import Logo from "/assets/images/ourair_logo.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { combineWithNumAndLetter, isMinPassLengthEight, minPassLengthEight, passWithNumAndLetter } from "../utils/passRegex";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/actions/authAction";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../components/common/Toast";

const GantiPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNewPassEmpty, setIsNewPassEmpty] = useState(false);
  const [isConfirmPassEmpty, setIsConfirmPassEmpty] = useState(false);
  const [checkIsPassSame, setCheckIsPassSame] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  console.log("token :>> ", token);
  const dispatch = useDispatch();

  const checkConfirmPassword = () => {
    setCheckIsPassSame(newPassword.trim() === confirmPassword.trim());
  };

  const checkEmptyFields = () => {
    setIsNewPassEmpty(newPassword.trim().length === 0);
    setIsConfirmPassEmpty(confirmPassword.trim().length === 0);
  };

  useEffect(() => {
    if (isSubmitted) {
      checkEmptyFields();
    }
    checkConfirmPassword();
  }, [newPassword, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkEmptyFields();
    if (minPassLengthEight(newPassword) && combineWithNumAndLetter(newPassword)) {
      alert("execute");
      dispatch(resetPassword(token, newPassword, navigate));
    }
    setIsSubmitted(true);
  };

  return (
    <div className="w-full flex h-screen justify-center items-center">
      <div className="flex items-center justify-center w-full max-w-md h-fit m-auto px-5 py-8 border rounded-lg md:px-5 text-gray-900">
        <div className="w-full max-w-sm">
          <img src={Logo} alt="Our Air" className="w-full h-auto max-w-28 mx-auto" />
          <h1 className="my-4 text-2xl text-center font-bold ">Reset Password</h1>
          <form>
            <div className="mb-2">
              <label htmlFor="new-password" className="text-left block mb-2 text-xs ">
                Masukkan Password Baru
              </label>
              <div className="relative">
                <input id="new-password" type={showNewPassword ? "text" : "password"} placeholder="Masukkan Password Baru" className={`input-primary text-xs  ${isNewPassEmpty ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`} aria-label="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button className="absolute right-0 top-0 py-[14px] px-1 rounded-e-xl" onClick={() => setShowNewPassword(!showNewPassword)} type="button">
                  <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} className="text-gray-400 h-[13px]" width="32" height="32" />
                </button>
                <p className={`${isNewPassEmpty ? "block" : "hidden"}  text-xs  text-red-500`}>Mohon inputkan password baru</p>
                <div className="pass-check mt-1">
                  <div className={isMinPassLengthEight("style", newPassword)}>
                    <span className="text-xs">
                      <FontAwesomeIcon icon={isMinPassLengthEight("icon", newPassword)} /> Minimal panjang password 8 karakter
                    </span>
                  </div>
                  <div className={passWithNumAndLetter("style", newPassword)}>
                    <div className="text-xs">
                      <FontAwesomeIcon icon={passWithNumAndLetter("icon", newPassword)} /> Kombinasikan password dengan huruf dan angka
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="text-left block  mt-3 mb-2 text-xs ">
                Ulangi Password Baru
              </label>
              <div className="relative">
                <input id="confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Ulangi Password" className={`outline-none input-primary text-xs ${isConfirmPassEmpty ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`} aria-label="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button className="absolute right-0 top-0 py-[14px] px-1 rounded-e-xl" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-gray-400 h-[13px]" width="32" height="32" />
                </button>
                <p className={`${isConfirmPassEmpty ? "block" : "hidden"}  text-xs  text-red-500`}>Mohon inputkan ulang password</p>
                <div>
                  <span className="text-xs text-gray-500">
                    {checkIsPassSame && confirmPassword ? (
                      <div className="text-green-500">
                        <FontAwesomeIcon icon={faCheck} /> Password sudah sesuai
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon icon={faXmark} /> Password belum sesuai
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <ButtonPrimary onClick={handleSubmit} text="Ubah Password" />
            </div>
          </form>
        </div>
        <Toast />
      </div>
    </div>
  );
};

export default GantiPassword;
