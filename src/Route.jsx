import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OTP from "./pages/OTP";
function Route() {
  const router = createBrowserRouter([
    {
      path: `/otp`,
      element: <OTP />,
    },
    {
      path: `/`,
      element: <OTP />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Route;
