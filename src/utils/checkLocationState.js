import { toast } from "react-toastify";

export const checkLocationState = (location, navigate) => {
  if (location.state) {
    if (location.state.info) {
      toast.info(location.state.info, {
        toastId: "toastInfo",
      });
    } else if (location.state.success) {
      toast.success(location.state.success);
    }
    navigate(".", { state: false });
  }
};
