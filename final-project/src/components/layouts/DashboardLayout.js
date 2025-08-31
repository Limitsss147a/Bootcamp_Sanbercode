import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Pastikan path ke Sidebar sudah benar

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            {/* Outlet adalah komponen kunci dari React Router.
              Di sinilah konten dari rute anak (seperti DashboardOverview, 
              JobListManagement, dll.) akan ditampilkan. 
              TANPA INI, halaman akan kosong dan menyebabkan error.
            */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;