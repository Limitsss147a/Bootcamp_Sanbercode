import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../../components/ui/Card'; // Impor komponen card kita
import { Spinner } from 'flowbite-react';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://final-project-api-alpha.vercel.app/api/jobs');
        setJobs(response.data.data);
      } catch (err) {
        setError('Failed to fetch job listings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Job Vacancies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListPage;