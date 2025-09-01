import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PublicLayout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            JobHunt
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
              Home
            </Link>

            {isAuthenticated ? (
              // JIKA SUDAH LOGIN
              <>
                <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              // JIKA BELUM LOGIN
              <Link
                to="/login"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-6 py-8 text-center">
          <p>&copy; {new Date().getFullYear()} JobHunt.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;