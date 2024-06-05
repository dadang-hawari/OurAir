import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import OTP from './pages/OTP'
import Beranda from './pages/Beranda'
import Login from './pages/Login'
import LupaPassword from './pages/LupaPassword'
import GantiPassword from './pages/GantiPassword'
import Daftar from './pages/Daftar'
import PilihPenerbangan from './pages/PilihPenerbangan'
import Profile from './pages/Profile'
export default function Route() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Beranda />,
    },
    {
      path: `/otp`,
      element: <OTP />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/lupa-password',
      element: <LupaPassword />,
    },
    {
      path: '/daftar',
      element: <Daftar />,
    },
    {
      path: '/ganti-password/:token',
      element: <GantiPassword />,
    },
    {
      path: '/pilih-penerbangan',
      element: <PilihPenerbangan />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
  ])

  return <RouterProvider router={router} />
}
