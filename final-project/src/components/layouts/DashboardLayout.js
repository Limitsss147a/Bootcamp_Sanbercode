import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './Sidebar'; // Impor Sidebar yang baru dibuat

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0">
        <DashboardSidebar />
      </aside>
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        {/* Konten halaman dashboard akan dirender di sini */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;