import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import OTP from './pages/OTP'
import Beranda from './pages/Beranda'
import Login from './pages/Login'
import LupaPassword from './pages/LupaPassword'
import GantiPassword from './pages/GantiPassword'
import Daftar from './pages/Daftar'
import PilihPenerbangan from './pages/PilihPenerbangan'
import Profile from './pages/Profile'
import LoadingGoogle from './components/LoadingGoogle'
import RiwayatPemesanan from './pages/RiwayatPemesanan'
import CheckoutBiodataPemesanan from './pages/Checkout/CheckoutBiodataPemesanan'
import Notification from './pages/Notification'
import Tentang from './pages/Tentang'
import MenungguPembayaran from './pages/Checkout/MenungguPembayaran'
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
      path: '/auth-user/:token',
      element: <LoadingGoogle />,
    },
    {
      path: '/pilih-penerbangan',
      element: <PilihPenerbangan />,
    },
    {
      path: '/riwayat-pemesanan',
      element: <RiwayatPemesanan />,
    },
    {
      path: '/checkout-pemesanan',
      element: <CheckoutBiodataPemesanan />,
    },
    {
      path: '/menunggu-pembayaran',
      element: <MenungguPembayaran />,
    },
    {
      path: '/Notification',
      element: <Notification />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/tentang',
      element: <Tentang />,
    },
  ])

  return <RouterProvider router={router} />
}
