import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image_url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Mock registration function
  const mockRegister = async (name, email, password, image_url) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (email === 'existing@test.com') {
      return { success: false, message: 'Email sudah terdaftar.' };
    } else {
      return { success: true, message: 'Registrasi berhasil! Silakan login.' };
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    try {
      const result = await mockRegister(
        formData.name,
        formData.email,
        formData.password,
        formData.image_url
      );
      
      if (result.success) {
        setSuccess(result.message);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          image_url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        });
        // redirect otomatis ke login setelah registrasi berhasil
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const suggestedImages = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5a0?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Akun Baru
          </h2>
          <p className="text-gray-600">Bergabunglah dengan kami</p>
        </div>
        
        {/* error / success */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}
        
        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Konfirmasi password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
              URL Foto Profil
            </label>
            <input
              id="image_url"
              name="image_url"
              type="url"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/foto.jpg"
              value={formData.image_url}
              onChange={handleChange}
            />
            
            {/* Preview foto profil */}
            <div className="mt-3 flex items-center space-x-3">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                }}
              />
              <span className="text-sm text-gray-500">Preview foto profil</span>
            </div>
            
            {/* Suggested images */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Atau pilih salah satu:</p>
              <div className="flex space-x-2">
                {suggestedImages.map((url, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: url })}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-indigo-300"
                  >
                    <img src={url} alt={`Option ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700 font-semibold disabled:bg-green-400"
          >
            {loading ? 'Memproses...' : 'Daftar Akun'}
          </button>
        </form>
        
        <div className="text-center">
          <p className="text-gray-600">
            Sudah punya akun?{' '}
            <button 
              onClick={handleLoginClick}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
