import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://final-project-api-alpha.vercel.app/api/jobs"
        );
        setJobs(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Job Vacancies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={job.company_image_url}
                  alt={job.company_name}
                  className="w-16 h-16 object-contain rounded-full mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-md text-gray-600">{job.company_name}</p>
                </div>
              </div>
              <p className="text-gray-500 mb-2">{job.company_city}</p>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  job.job_status === 1
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {job.job_status === 1 ? "Open" : "Closed"}
              </span>
              <div className="mt-6 flex justify-end">
                <Link
                  to={`/job-vacancy/${job.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListPage;