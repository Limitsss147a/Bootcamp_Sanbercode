import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../../components/ui/Card';
import { Spinner, Button } from 'flowbite-react';

const HomePage = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        // Ambil semua data, lalu potong untuk menampilkan beberapa saja
        const response = await axios.get('https://final-project-api-alpha.vercel.app/api/jobs');
        // Tampilkan 6 pekerjaan terbaru sebagai highlight
        setLatestJobs(response.data.data.slice(0, 6)); 
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJobs();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 lg:text-xl">
          Explore thousands of job opportunities with the information you need.
        </p>
        <Link to="/job-vacancy" className="mt-8 inline-block">
          <Button size="xl" color="info">
            Browse All Jobs
          </Button>
        </Link>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Job Openings</h2>
        {loading ? (
          <div className="text-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;