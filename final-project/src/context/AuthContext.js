import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan axios sudah di-install

// 1. Membuat Context
export const AuthContext = createContext(null);

// 2. Membuat Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Ambil token dari localStorage saat pertama kali aplikasi dimuat
  const [token, setToken] = useState(localStorage.getItem('token'));

  // useEffect untuk mengatur header Authorization di axios setiap kali token berubah
  useEffect(() => {
    if (token) {
      // Menyimpan token di localStorage agar tidak hilang saat refresh
      localStorage.setItem('token', token);
      // Mengatur header default untuk semua request axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Menghapus token dari localStorage dan header axios jika token null
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fungsi untuk menangani login
  const login = async (credentials) => {
    try {
      const response = await axios.post('https://final-project-api-alpha.vercel.app/api/auth/login', credentials);
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData); // Simpan juga data user jika API mengembalikannya
      
      return response; // Mengembalikan response agar bisa ditangani di halaman login
    } catch (error) {
      console.error("Login failed:", error);
      // Lemparkan error agar bisa ditangkap di komponen pemanggil
      throw error;
    }
  };
  
  // Fungsi untuk menangani logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };
  
  // Nilai yang akan disediakan untuk semua komponen di dalam provider
  const value = {
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};