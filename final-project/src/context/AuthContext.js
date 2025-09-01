import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token')); 
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      console.log("Token ditemukan di localStorage, status: logged in.");
    } else {
      console.log("Tidak ada token, status: logged out.");
    }
  }, [token]);

  // Fungsi untuk proses login
  const login = async (email, password) => {
    console.log("Mencoba login dengan email:", email);
    try {
      const response = await axios.post('https://final-project-api-alpha.vercel.app/api/auth/login', {
        email,
        password,
      });

      console.log("Login berhasil!", response.data);

      // Simpan token dan data user dari response API
      const { token: responseToken, user: userData } = response.data;
      
      localStorage.setItem('token', responseToken);
      setToken(responseToken);
      setUser(userData);
      
      // Arahkan ke dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error("Login Gagal:", error.response ? error.response.data : error.message);
      alert("Login Gagal! Periksa kembali email dan password Anda.");
    }
  };

  // Fungsi untuk proses registrasi
  const register = async (name, email, password, imageUrl) => {
    console.log("Mencoba registrasi dengan email:", email);
    try {
      await axios.post('https://final-project-api-alpha.vercel.app/api/auth/register', {
        name,
        email,
        password,
        image_url: imageUrl
      });
      console.log("Registrasi berhasil!");
      alert("Registrasi berhasil! Silakan login.");
      // Arahkan ke halaman login setelah registrasi sukses
      navigate('/login');
    } catch (error) {
      console.error("Registrasi Gagal:", error.response ? error.response.data : error.message);
      alert("Registrasi Gagal! Mungkin email sudah digunakan.");
    }
  };

  // Fungsi untuk logout
  const logout = () => {
    console.log("Proses logout...");
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  // Nilai yang akan disediakan oleh context
  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};