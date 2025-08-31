import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  // ==========================================================
  // INI BAGIAN useEffect YANG ANDA CARI
  // ==========================================================
  // Tujuan: Menjaga state login tetap ada saat halaman di-refresh.
  useEffect(() => {
    if (token) {
      // Jika ada token di localStorage, kita anggap pengguna sudah login.
      // Di aplikasi production, Anda bisa menambahkan validasi token ke API di sini.
      console.log("Token ditemukan. Pengguna dianggap sudah login.");
    } else {
      console.log("Tidak ada token. Pengguna dianggap belum login.");
    }
  }, [token]); // Hook ini akan berjalan setiap kali nilai 'token' berubah.

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://final-project-api-alpha.vercel.app/api/auth/login', {
        email,
        password,
      });
      const { token: responseToken, user: userData } = response.data;
      localStorage.setItem('token', responseToken);
      setToken(responseToken);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login Gagal:', error.response ? error.response.data : error.message);
      return false;
    }
  };

  // ==========================================================
  // INI FUNGSI register YANG ANDA CARI
  // ==========================================================
  const register = async (name, email, password, imageUrl) => {
    try {
      await axios.post('https://final-project-api-alpha.vercel.app/api/auth/register', {
        name,
        email,
        password,
        image_url: imageUrl,
      });
      alert("Registrasi berhasil! Silakan login dengan akun Anda.");
      navigate('/login'); // Arahkan ke halaman login setelah sukses
      return true;
    } catch (error) {
      console.error("Registrasi Gagal:", error.response ? error.response.data : error.message);
      alert("Registrasi Gagal! Mungkin email sudah terdaftar.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  // Menyediakan semua state dan fungsi ke komponen lain
  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    register, // <-- register sekarang disertakan
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};