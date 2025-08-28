import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Hook yang kita buat tadi

const ProtectedRoute = () => {
  // Mengambil token dari context
  const { token } = useAuth();

  // Memeriksa apakah ada token
  if (!token) {
    // Jika tidak ada, alihkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada, tampilkan konten halaman yang dilindungi
  return <Outlet />;
};

export default ProtectedRoute;