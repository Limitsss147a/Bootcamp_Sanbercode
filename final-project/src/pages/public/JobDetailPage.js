import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(
          `https://final-project-api-alpha.vercel.app/api/jobs/${id}`
        );
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat detail pekerjaan.");
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Pekerjaan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-start mb-6">
          <img
            src={job.company_image_url}
            alt={job.company_name}
            className="w-24 h-24 object-contain rounded-lg mr-6 border"
          />
          <div>
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <p className="text-xl text-gray-700">{job.company_name}</p>
            <p className="text-gray-500">{job.company_city}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mt-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3 border-b pb-2">
              Deskripsi Pekerjaan
            </h2>
            <p className="text-gray-600 whitespace-pre-line">{job.job_description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3 border-b pb-2">
              Kualifikasi
            </h2>
            <p className="text-gray-600 whitespace-pre-line">{job.job_qualification}</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Detail Tambahan</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-gray-700">
            <p><strong className="font-semibold text-gray-900">Tipe:</strong> {job.job_type}</p>
            <p><strong className="font-semibold text-gray-900">Masa Kerja:</strong> {job.job_tenure}</p>
            <p>
              <strong className="font-semibold text-gray-900">Gaji:</strong> 
              Rp {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;