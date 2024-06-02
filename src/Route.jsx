import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OTP from "./pages/OTP";
import Beranda from "./pages/Beranda";
import Login from "./pages/Login";
import LupaPassword from "./pages/LupaPassword";
import GantiPassword from "./pages/GantiPassword";
import Daftar from "./pages/Daftar";
export default function Route() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Beranda />,
    },
    {
      path: `/otp`,
      element: <OTP />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/lupa-password",
      element: <LupaPassword />,
    },
    {
      path: "/ganti-password/:token",
      element: <GantiPassword />,
    },
    {
      path: "/daftar",
      element: <Daftar />,
    },
  ]);

  return <RouterProvider router={router} />;
}
