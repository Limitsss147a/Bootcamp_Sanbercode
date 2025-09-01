import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon, MapPinIcon, BriefcaseIcon, CurrencyDollarIcon, BuildingOffice2Icon } from '@heroicons/react/24/solid';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Gagal memuat detail pekerjaan.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJobDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Memuat detail...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="text-center py-20">Lowongan tidak ditemukan.</div>;
  }

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline mb-6">
          <ArrowLeftIcon className="w-5 h-5" />
          Kembali ke Daftar Lowongan
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Header Detail */}
          <div className="p-8 md:p-12">
            <div className="flex items-start">
              <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center mr-6">
                <img src={job.company_image_url} alt={job.company_name} className="w-16 h-16 object-contain"/>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{job.title}</h1>
                <p className="flex items-center gap-2 text-lg text-gray-600 mt-2">
                  <BuildingOffice2Icon className="w-5 h-5 text-gray-400" /> {job.company_name}
                </p>
              </div>
            </div>
            {/* Info Detail */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 border-t border-b py-6">
              <div>
                <p className="text-sm text-gray-500">Lokasi</p>
                <p className="flex items-center gap-2 font-semibold text-gray-800"><MapPinIcon className="w-5 h-5 text-indigo-500"/> {job.company_city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipe</p>
                <p className="flex items-center gap-2 font-semibold text-gray-800"><BriefcaseIcon className="w-5 h-5 text-indigo-500"/> {job.job_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Masa Kerja</p>
                <p className="font-semibold text-gray-800">{job.job_tenure}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gaji</p>
                <p className="flex items-center gap-2 font-semibold text-gray-800"><CurrencyDollarIcon className="w-5 h-5 text-indigo-500"/> Rp {job.salary_min/1000000}jt - {job.salary_max/1000000}jt</p>
              </div>
            </div>
          </div>
          
          {/* Deskripsi & Kualifikasi */}
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Deskripsi Pekerjaan</h2>
              <p>{job.job_description}</p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-8">Kualifikasi</h2>
              <p>{job.job_qualification}</p>
            </div>
            
            {/* Tombol Lamar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 p-6 rounded-lg border">
                <h3 className="text-lg font-bold">Tertarik dengan posisi ini?</h3>
                <p className="text-sm text-gray-600 mt-2">Segera kirimkan lamaran terbaik Anda sebelum lowongan ditutup!</p>
                <button className="w-full mt-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                  Lamar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;