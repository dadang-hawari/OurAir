import { Link } from "react-router-dom";
import Navbar from "./navbar";

export default function Beranda() {
  return (
    <div>
      <Navbar />
      <div className="w-full h-screen flex items-center justify-center bg-blue-400">
        <div className="relative">
          <button>
            <Link to="/Login" className="text-black hover:text-blue-500">
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
