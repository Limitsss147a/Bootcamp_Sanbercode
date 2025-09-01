import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Konten */}
        <header className="bg-white shadow-sm p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Selamat datang kembali!</p>
            </div>
            <div className="flex items-center space-x-4">
              <BellIcon className="h-6 w-6 text-gray-500 hover:text-indigo-600 cursor-pointer"/>
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-10 w-10 text-gray-400"/>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{user ? user.name : 'Pengguna'}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Konten Utama dari Outlet */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;