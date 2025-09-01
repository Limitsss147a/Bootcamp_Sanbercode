import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    new_confirm_password: '',
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ini hanya tampilan saja, belum ada logic ubah password 😊");
  };

  return (
    <div className="p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Ubah Password</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
              Password Saat Ini
            </label>
            <input
              type="password"
              name="current_password"
              id="current_password"
              required
              value={passwords.current_password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
              Password Baru (min. 8 karakter)
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              required
              value={passwords.new_password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="new_confirm_password" className="block text-sm font-medium text-gray-700">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              name="new_confirm_password"
              id="new_confirm_password"
              required
              value={passwords.new_confirm_password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              Ubah Password
            </button>
          </div>
        </form>

        <div className="mt-8 border-t pt-6">
          <button 
            onClick={() => navigate(-1)} 
            className="text-indigo-600 font-semibold hover:underline"
          >
            &larr; Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;