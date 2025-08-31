import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            JobHunt
          </Link>
          <div>
            <Link to="/" className="px-4 text-gray-700 hover:text-indigo-600 font-semibold">
              Beranda
            </Link>
            <Link 
              to="/login" 
              className="ml-4 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-6 text-center">
          <p>&copy; 2025 JobHunt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;