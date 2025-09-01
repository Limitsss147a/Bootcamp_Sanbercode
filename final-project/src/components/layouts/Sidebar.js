import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  KeyIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      icon: HomeIcon,
      label: 'Halaman Utama'
    },
    {
      path: '/dashboard/list-job-vacancy',
      icon: BriefcaseIcon,
      label: 'Kelola Lowongan'
    },
    {
      path: '/dashboard/profile',
      icon: UserIcon,
      label: 'Profil'
    },
    {
      path: '/dashboard/change-password',
      icon: KeyIcon,
      label: 'Ganti Password'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/dashboard/list-job-vacancy' && location.pathname.startsWith('/dashboard/list-job-vacancy'));
  };

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="bg-indigo-600 rounded-lg p-2">
            <HomeIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">JobHunt</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <div className="px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Menu Utama
          </p>
        </div>
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
