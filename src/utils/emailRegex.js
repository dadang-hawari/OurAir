import { toast } from "react-toastify";

export const isEmailValid = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(email)) {
    return true;
  } else {
    toast("Mohon inputkan email address yang valid", { className: "toast-error", toastId: "toasError" });
    return false;
  }
};
