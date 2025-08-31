import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const activeLinkStyle = {
    backgroundColor: '#4f46e5',
    color: 'white',
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="px-8 py-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>
      <nav className="flex-grow">
        {/* Hapus NavLink untuk "Overview" */}
        <NavLink
          to="/dashboard/list-job-vacancy" // Ini sekarang menjadi menu utama
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          className="block px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
        >
          Kelola Lowongan
        </NavLink>
      </nav>
      <div className="px-8 py-6">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;