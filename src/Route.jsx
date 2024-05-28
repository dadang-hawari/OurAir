import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OTP from "./pages/OTP";
import Beranda from "./pages/Beranda";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
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
      element: <Login />,
    },

    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}
