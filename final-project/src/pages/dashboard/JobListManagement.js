import React, { useEffect, useState, useContext, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BriefcaseIcon, CheckCircleIcon, XCircleIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const JobListManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  // State untuk search dan filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // '1' untuk Dibuka, '0' untuk Ditutup

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://final-project-api-alpha.vercel.app/api/jobs');
      const fetchedJobs = response.data?.data || response.data || [];
      setJobs(fetchedJobs);
      setError(null);
    } catch (err) {
      setError("Gagal mengambil data lowongan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Logika untuk memfilter dan mencari data
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus ? job.job_status.toString() === filterStatus : true;
      return matchSearch && matchStatus;
    });
  }, [jobs, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter(job => job.job_status === 1).length;
    const closed = total - active;
    const companies = [...new Set(jobs.map(job => job.company_name))].length;
    return { total, active, closed, companies };
  }, [jobs]);

  const handleDelete = async (jobId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      try {
        await axios.delete(`https://final-project-api-alpha.vercel.app/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchJobs();
      } catch (err) {
        alert("Gagal menghapus data.");
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-8 space-y-8">
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<BriefcaseIcon className="w-8 h-8 text-blue-500"/>} title="Total Lowongan" value={stats.total} />
        <StatCard icon={<CheckCircleIcon className="w-8 h-8 text-green-500"/>} title="Lowongan Aktif" value={stats.active} />
        <StatCard icon={<XCircleIcon className="w-8 h-8 text-red-500"/>} title="Lowongan Ditutup" value={stats.closed} />
        <StatCard icon={<BuildingOfficeIcon className="w-8 h-8 text-indigo-500"/>} title="Total Perusahaan" value={stats.companies} />
      </div>
      
      {/* Tabel Data */}
      <div className="bg-white shadow-lg rounded-xl border border-slate-200">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Daftar Lowongan Pekerjaan</h2>
          
          {/* ============== BAGIAN FILTER & SEARCH BARU ============== */}
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Cari berdasarkan judul atau perusahaan..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="1">Dibuka</option>
              <option value="0">Ditutup</option>
            </select>
            <Link
              to="/dashboard/list-job-vacancy/form"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center"
            >
              Buat Baru
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            {/* ... (thead tetap sama) ... */}
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600">No</th>
                <th className="p-4 text-left font-semibold text-gray-600">Posisi</th>
                <th className="p-4 text-left font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Gunakan filteredJobs untuk me-render tabel */}
              {filteredJobs.map((job, index) => (
                <tr key={job._id} className="hover:bg-slate-50">
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  <td className="p-4">
                    <p className="font-bold text-gray-800">{job.title}</p>
                    <p className="text-gray-500">{job.company_name}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full font-semibold text-xs ${ job.job_status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                      {job.job_status === 1 ? 'Dibuka' : 'Ditutup'}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <Link to={`/dashboard/list-job-vacancy/form/${job._id}`} className="px-3 py-1 bg-yellow-400 text-white rounded-md font-semibold hover:bg-yellow-500">Edit</Link>
                    <button onClick={() => handleDelete(job._id)} className="px-3 py-1 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Komponen StatCard (tetap sama)
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg flex items-center space-x-4">
    <div className="bg-slate-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default JobListManagement;