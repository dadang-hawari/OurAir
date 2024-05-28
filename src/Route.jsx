import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OTP from "./pages/OTP";
import Beranda from "./pages/Beranda";
import Login from "./pages/Login";
import LupaPassword from "./pages/LupaPassword";
import Register from "./pages/Register";
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
      element: <Login />
    },

    {
      path: "/lupa-password",
      element: <LupaPassword />,
    },
    {
      path: "/daftar",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}
