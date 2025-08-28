import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Card, Badge } from 'flowbite-react';

const JobDetailPage = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`);
        setJob(response.data.data);
      } catch (err) {
        setError('Failed to fetch job details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !job) {
    return <div className="text-center text-red-500 mt-20">{error || 'Job not found.'}</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <div className="flex items-center mb-4">
        <img src={job.company_image_url} alt={`${job.company_name} logo`} className="w-20 h-20 mr-6 object-contain" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{job.company_name}</p>
          <p className="text-md text-gray-500 dark:text-gray-500">{job.company_city}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-4">
        <Badge color="info">{job.job_type}</Badge>
        <Badge color="gray">{job.job_tenure}</Badge>
        <Badge color={job.job_status === 1 ? 'success' : 'failure'}>
          {job.job_status === 1 ? 'Open' : 'Closed'}
        </Badge>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Salary Range</h2>
        <p>Rp {job.salary_min?.toLocaleString()} - Rp {job.salary_max?.toLocaleString()}</p>
      </div>

      <hr className="my-6" />

      <div>
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 dark:text-gray-400 whitespace-pre-line">{job.job_description}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
        <p className="text-gray-700 dark:text-gray-400 whitespace-pre-line">{job.job_qualification}</p>
      </div>
    </Card>
  );
};

export default JobDetailPage;