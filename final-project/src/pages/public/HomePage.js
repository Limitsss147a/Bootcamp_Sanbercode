import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  // 1. Siapkan state untuk menampung data, status loading, dan error
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Buat fungsi untuk mengambil data dari API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://final-project-api-alpha.vercel.app/api/jobs');
        
        // Cek jika data ada dan merupakan sebuah array
        if (response.data && Array.isArray(response.data)) {
          setJobs(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setJobs(response.data.data);
        }

      } catch (err) {
        setError("Gagal memuat data lowongan pekerjaan. Coba lagi nanti.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs(); // Panggil fungsi tersebut saat komponen dimuat
  }, []); // [] berarti useEffect hanya berjalan sekali

  // Fungsi untuk menampilkan konten berdasarkan state
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-lg text-gray-500">Memuat lowongan...</p>;
    }

    if (error) {
      return <p className="text-center text-lg text-red-600">{error}</p>;
    }

    if (jobs.length === 0) {
      return <p className="text-center text-lg text-gray-500">Saat ini tidak ada lowongan yang tersedia.</p>;
    }

    // 3. Tampilkan data dalam bentuk kartu (cards)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job._id} // Gunakan _id sesuai struktur API
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-grow">
              <div className="flex items-start mb-4">
                <img
                  src={job.company_image_url}
                  alt={job.company_name}
                  className="w-16 h-16 object-contain rounded-md mr-5 border p-1"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">{job.company_name}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{job.company_city}</p>
              <div className="text-xs text-gray-700 space-y-1">
                <p><span className="font-semibold">Tipe:</span> {job.job_type}</p>
                <p><span className="font-semibold">Masa Kerja:</span> {job.job_tenure}</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-between items-center border-t">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  job.job_status === 1
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {job.job_status === 1 ? 'Dibuka' : 'Ditutup'}
              </span>
              <Link
                to={`/job-vacancy/${job._id}`} // Arahkan ke halaman detail
                className="font-semibold text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Lihat Detail &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-20 px-6 bg-gray-50 rounded-xl mb-12 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Temukan Pekerjaan Impian Anda
        </h1>
        <p className="mt-4 text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
          Jelajahi ribuan lowongan pekerjaan dari perusahaan ternama di seluruh Indonesia.
        </p>
      </div>
      
      {/* Judul Bagian Lowongan */}
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Lowongan Terbaru
      </h2>

      {/* Konten Lowongan */}
      {renderContent()}
    </div>
  );
};

export default HomePage;