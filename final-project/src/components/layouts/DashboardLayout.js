import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { BellIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Sidebar for Mobile (Overlay) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header/Navbar */}
        <header className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors mr-2"
                >
                  <Bars3Icon className="h-6 w-6 text-gray-500" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
                  <p className="hidden sm:block text-sm text-gray-500 mt-1">Selamat datang kembali!</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <BellIcon className="h-6 w-6 text-gray-500 hover:text-indigo-600" />
                </button>

                <div className="hidden sm:flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  {user?.image_url ? (
                    <img
                      src={user.image_url}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="Default Avatar"
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-semibold text-sm text-gray-800">
                      {user?.name || 'Pengguna'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <svg className="sm:hidden h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;