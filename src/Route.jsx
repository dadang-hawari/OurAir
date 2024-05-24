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
      path: "/Login",
      element: <Login />,
    },

    {
      path: "/ForgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}