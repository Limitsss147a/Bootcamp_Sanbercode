import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // 1. Tambahkan Navigate
import PublicLayout from '../components/layouts/PublicLayout';
import DashboardLayout from '../components/layouts/DashboardLayout';
import HomePage from '../pages/public/HomePage';
import JobDetailPage from '../pages/public/JobDetailPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import JobListManagement from '../pages/dashboard/JobListManagement';
import JobForm from '../pages/dashboard/JobForm';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// 2. Komponen kecil untuk melakukan redirect
const DashboardRedirect = () => <Navigate to="/dashboard/list-job-vacancy" replace />;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="job-vacancy/:id" element={<JobDetailPage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Rute Dashboard yang Dilindungi */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* 3. Ubah index element menjadi komponen redirect */}
        <Route index element={<DashboardRedirect />} />
        <Route path="list-job-vacancy" element={<JobListManagement />} />
        <Route path="list-job-vacancy/form" element={<JobForm />} />
        <Route path="list-job-vacancy/form/:id" element={<JobForm />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;