import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "../components/Header";
import Toast from "../components/common/Toast";
import { useEffect } from "react";
import { checkLocationState } from "../utils/checkLocationState";
import { Bounce } from "react-toastify";
import Footer from "./Footer";

export default function Beranda() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkLocationState(location, navigate);
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="relative">
          <button>
            <Link to="/Login" className="text-black hover:text-blue-500">
              Login
            </Link>
          </button>
        </div>
      </div>
      <Toast autoClose={2000} position="bottom-center" transition={Bounce} margin="mt-0" />
      <Footer />
    </div>
  );
}
