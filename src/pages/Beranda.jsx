import { Link } from "react-router-dom";

export default function Beranda() {
  return (
    <div>
      <button>
        <Link to="/Login" className="text-black mt-2 hover:text-blue-500">
          Login
        </Link>
      </button>
    </div>
  );
}
