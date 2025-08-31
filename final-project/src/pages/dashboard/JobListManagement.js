import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const JobListManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://final-project-api-alpha.vercel.app/api/jobs');
      
      // Mengambil data dari response.data (berdasarkan struktur API Anda)
      if (response.data && Array.isArray(response.data)) {
        setJobs(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        // Fallback jika struktur API ternyata { data: [...] }
        setJobs(response.data.data);
      }
      
      setError(null);
    } catch (err) {
      setError("Gagal mengambil data lowongan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      try {
        await axios.delete(`https://final-project-api-alpha.vercel.app/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchJobs(); // Ambil ulang data setelah berhasil menghapus
      } catch (err) {
        alert("Gagal menghapus data.");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Memuat data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Lowongan</h1>
        <Link
          to="/dashboard/list-job-vacancy/form"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Buat Lowongan Baru
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            {/* ... header tabel tidak berubah ... */}
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Judul Lowongan
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Perusahaan
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {/* Gunakan job._id sebagai key unik */}
            {jobs.map((job) => (
              <tr key={job._id}> 
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{job.title}</p>
                  <p className="text-gray-600 whitespace-no-wrap text-xs">{job.company_city}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{job.company_name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${ job.job_status === 1 ? 'text-green-900' : 'text-red-900' }`}>
                    <span aria-hidden className={`absolute inset-0 ${ job.job_status === 1 ? 'bg-green-200' : 'bg-red-200' } opacity-50 rounded-full`}></span>
                    <span className="relative">{job.job_status === 1 ? 'Dibuka' : 'Ditutup'}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  {/* Gunakan job._id untuk link Edit dan tombol Hapus */}
                  <Link to={`/dashboard/list-job-vacancy/form/${job._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(job._id)} className="text-red-600 hover:text-red-900 font-semibold">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListManagement;