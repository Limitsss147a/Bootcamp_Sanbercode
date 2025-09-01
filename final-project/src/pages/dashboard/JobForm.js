import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


const initialFormData = {
  title: '',
  job_description: '',
  job_qualification: '',
  job_type: '',
  job_tenure: '',
  job_status: 1,
  company_name: '',
  company_image_url: '',
  company_city: '',
  salary_min: 0,
  salary_max: 0,
};

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      // Mode Edit
      setIsEditMode(true);
      const fetchJobData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`);
          setFormData({ ...initialFormData, ...response.data });
        } catch (error) {
          console.error("Gagal mengambil data pekerjaan:", error);
          alert("Gagal memuat data untuk diedit.");
        } finally {
          setLoading(false);
        }
      };
      fetchJobData();
    } else {
      // Mode Buat Baru
      setIsEditMode(false);
      setFormData(initialFormData);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Konversi ke angka jika tipenya number
    const finalValue = type === 'number' ? parseInt(value, 10) : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiHeaders = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      if (isEditMode) {
        // Mode Edit
        await axios.put(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`, formData, apiHeaders);
        alert('Data berhasil diperbarui!');
      } else {
        // Mode Create
        await axios.post('https://final-project-api-alpha.vercel.app/api/jobs', formData, apiHeaders);
        alert('Data berhasil dibuat!');
      }
      navigate('/dashboard/list-job-vacancy');
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response ? error.response.data : error.message);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="p-6 text-center">Memuat data form...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 border-b pb-4">
          {isEditMode ? 'Edit Lowongan Pekerjaan' : 'Buat Lowongan Pekerjaan Baru'}
        </h1>
        {/* Baris 1: Judul dan Nama Perusahaan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Lowongan</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
            <input type="text" name="company_name" id="company_name" value={formData.company_name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        {/* Deskripsi Pekerjaan */}
        <div>
          <label htmlFor="job_description" className="block text-sm font-medium text-gray-700">Deskripsi Pekerjaan</label>
          <textarea id="job_description" name="job_description" rows={4} value={formData.job_description} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>

        {/* Kualifikasi Pekerjaan */}
        <div>
          <label htmlFor="job_qualification" className="block text-sm font-medium text-gray-700">Kualifikasi Pekerjaan</label>
          <textarea id="job_qualification" name="job_qualification" rows={4} value={formData.job_qualification} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>

        {/* Logo Perusahaan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company_image_url" className="block text-sm font-medium text-gray-700">URL Logo Perusahaan</label>
            <input type="url" name="company_image_url" id="company_image_url" value={formData.company_image_url} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          {/* Kota Perusahaan */}
          <div>
            <label htmlFor="company_city" className="block text-sm font-medium text-gray-700">Kota Perusahaan</label>
            <input type="text" name="company_city" id="company_city" value={formData.company_city} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tipe Pekerjaan */}
          <div>
            <label htmlFor="job_type" className="block text-sm font-medium text-gray-700">Tipe Pekerjaan</label>
            <input type="text" name="job_type" id="job_type" placeholder="e.g., On-site, Remote" value={formData.job_type} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          {/* Masa Kerja */}
          <div>
            <label htmlFor="job_tenure" className="block text-sm font-medium text-gray-700">Masa Kerja</label>
            <input type="text" name="job_tenure" id="job_tenure" placeholder="e.g., Kontrak, Penuh Waktu" value={formData.job_tenure} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          {/* Status Lowongan */}
          <div>
            <label htmlFor="job_status" className="block text-sm font-medium text-gray-700">Status Lowongan</label>
            <select id="job_status" name="job_status" value={formData.job_status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value={1}>Dibuka</option>
              <option value={0}>Ditutup</option>
            </select>
          </div>
        </div>
        
        {/* Gaji */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="salary_min" className="block text-sm font-medium text-gray-700">Gaji Minimum</label>
            <input type="number" name="salary_min" id="salary_min" value={formData.salary_min} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="salary_max" className="block text-sm font-medium text-gray-700">Gaji Maksimum</label>
            <input type="number" name="salary_max" id="salary_max" value={formData.salary_max} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
        
        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button type="button" onClick={() => navigate('/dashboard/list-job-vacancy')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Batal
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;