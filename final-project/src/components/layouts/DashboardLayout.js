import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header/Navbar */}
        <header className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Selamat datang kembali!</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <BellIcon className="h-6 w-6 text-gray-500 hover:text-indigo-600" />
                </button>

                {/* User Profile Dropdown */}
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
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
                  <UserCircleIcon 
                    className="h-10 w-10 text-gray-400" 
                    style={{ display: 'none' }}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-gray-800">
                      {user?.name || 'Pengguna'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;