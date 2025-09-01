import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPinIcon, BriefcaseIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterMinSalary, setFilterMinSalary] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://final-project-api-alpha.vercel.app/api/jobs');
        const fetchedJobs = response.data?.data || response.data || [];
        setJobs(fetchedJobs);
      } catch (err) {
        setError("Gagal memuat data lowongan pekerjaan.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCity = filterCity ? job.company_city === filterCity : true;
      const matchCompany = filterCompany ? job.company_name === filterCompany : true;
      const matchSalary = filterMinSalary ? job.salary_min >= parseInt(filterMinSalary) : true;
      return matchSearch && matchCity && matchCompany && matchSalary;
    });
  }, [jobs, searchTerm, filterCity, filterCompany, filterMinSalary]);

  const uniqueCities = useMemo(() => [...new Set(jobs.map(job => job.company_city))], [jobs]);
  const uniqueCompanies = useMemo(() => [...new Set(jobs.map(job => job.company_name))], [jobs]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gray-200 rounded-lg mr-4"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) return <p className="text-center text-lg text-red-600">{error}</p>;
    if (filteredJobs.length === 0 && !loading) return <p className="text-center text-lg text-gray-500">Lowongan tidak ditemukan.</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredJobs.map((job, index) => (
          <div
            key={job._id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                  <img src={job.company_image_url} alt={job.company_name} className="w-12 h-12 object-contain"/>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{job.company_name}</p>
                  <h3 className="text-md font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-2 mt-4">
                <p className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2 text-gray-400" /> {job.company_city}</p>
                <p className="flex items-center"><BriefcaseIcon className="w-4 h-4 mr-2 text-gray-400" /> {job.job_type} ({job.job_tenure})</p>
                <p className="flex items-center"><CurrencyDollarIcon className="w-4 h-4 mr-2 text-gray-400" /> Rp {job.salary_min/1000000}jt - {job.salary_max/1000000}jt</p>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t flex justify-between items-center rounded-b-2xl">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ job.job_status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                {job.job_status === 1 ? 'Dibuka' : 'Ditutup'}
              </span>
              <Link to={`/job-vacancy/${job._id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                Lihat Detail &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="text-center py-12 md:py-20 px-4 sm:px-6 bg-white rounded-2xl mb-12 md:mb-16 border border-slate-200 shadow-lg">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Temukan <span className="text-indigo-600">Pekerjaan Terbaik</span> Anda, Hari Ini.
        </h1>
        <p className="mt-4 md:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Platform terpercaya untuk menghubungkan talenta hebat dengan peluang karir impian di seluruh Indonesia.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="sm:col-span-2 lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-1">Cari Pekerjaan</label>
            <input 
              type="text" 
              id="search" 
              placeholder="Contoh: Frontend Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">Kota</label>
            <select id="city" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
              <option value="">Semua Kota</option>
              {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">Perusahaan</label>
            <select id="company" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
              <option value="">Semua Perusahaan</option>
              {uniqueCompanies.map(comp => <option key={comp} value={comp}>{comp}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterCity('');
                setFilterCompany('');
              }}
              className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default HomePage;