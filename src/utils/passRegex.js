import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const passWithNumAndLetter = (type, password) => {
  const passNumAndLetter = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
  if (type === "style") {
    return passNumAndLetter ? "text-green-500" : "text-gray-500";
  }
  return passNumAndLetter ? faCheck : faXmark;
};

export const isMinPassLengthEight = (type, password) => {
  if (type === "style") {
    return password
      ? password.trim().length >= 8
        ? "text-green-500"
        : "text-gray-500"
      : "text-gray-500";
  } else {
    return password ? (password.trim().length >= 8 ? faCheck : faXmark) : faXmark;
  }
};
