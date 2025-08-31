import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Jika pengguna sudah login, arahkan mereka ke dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika belum login, tampilkan halaman yang diminta (Login atau Register)
  return <Outlet />;
};

export default PublicRoute;