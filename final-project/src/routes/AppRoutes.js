import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layouts/PublicLayout';
import DashboardLayout from '../components/layouts/DashboardLayout';

// Protected Route Guard
import ProtectedRoute from './ProtectedRoute';

// Pages (kita akan buat filenya setelah ini)
// import HomePage from '../pages/public/HomePage';
// import JobListPage from '../pages/public/JobListPage';
// import JobDetailPage from '../pages/public/JobDetailPage';
// import LoginPage from '../pages/public/LoginPage';
// import RegisterPage from '../pages/public/RegisterPage';
// import DashboardOverview from '../pages/dashboard/DashboardOverview';
// import JobListManagement from '../pages/dashboard/JobListManagement';
// import JobForm from '../pages/dashboard/JobForm';
// import NotFoundPage from '../pages/NotFoundPage';

// Placeholder components
const HomePage = () => <div>Home Page</div>;
const JobListPage = () => <div>Job List Page</div>;
const JobDetailPage = () => <div>Job Detail Page</div>;
const LoginPage = () => <div>Login Page</div>;
const RegisterPage = () => <div>Register Page</div>;
const DashboardOverview = () => <div>Dashboard Overview</div>;
const JobListManagement = () => <div>Job List Management</div>;
const JobForm = () => <div>Job Form</div>;
const NotFoundPage = () => <div>404 Not Found</div>;

export const router = createBrowserRouter([
  // Rute Publik
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'job-vacancy', element: <JobListPage /> },
      { path: 'job-vacancy/:id', element: <JobDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  
  // Rute yang Dilindungi (Dashboard)
  {
    path: '/dashboard',
    element: <ProtectedRoute />, // "Penjaga" diletakkan di sini
    children: [
      {
        element: <DashboardLayout />, // Layout hanya untuk rute yang lolos "penjaga"
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: 'list-job-vacancy', element: <JobListManagement /> },
          { path: 'list-job-vacancy/create', element: <JobForm /> },
          { path: 'list-job-vacancy/edit/:id', element: <JobForm /> },
        ],
      },
    ],
  },
  
  // Rute Halaman Tidak Ditemukan (404)
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);