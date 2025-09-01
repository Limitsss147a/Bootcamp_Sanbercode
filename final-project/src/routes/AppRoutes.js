import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Profile from '../pages/dashboard/Profile';
import ChangePassword from '../pages/dashboard/ChangePassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="job-vacancy/:id" element={<JobDetailPage />} />
      </Route>

      {/* Rute untuk yang BELUM login */}
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
        {/* Redirect dari /dashboard ke /dashboard/list-job-vacancy */}
        <Route index element={<Navigate to="list-job-vacancy" replace />} />
        <Route path="list-job-vacancy" element={<JobListManagement />} />
        <Route path="list-job-vacancy/form" element={<JobForm />} />
        <Route path="list-job-vacancy/form/:id" element={<JobForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      {/* Halaman Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;