import React from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  // Fungsi untuk memotong teks jika terlalu panjang
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <Card className="max-w-sm h-full">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex items-center mb-4">
            <img src={job.company_image_url} alt={`${job.company_name} logo`} className="w-12 h-12 mr-4 object-contain" />
            <div>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {job.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">{job.company_name}</p>
            </div>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {truncateText(job.job_description, 100)}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            <span>{job.company_city}</span> &bull; <span>{job.job_type}</span>
          </div>
        </div>
        <Link 
          to={`/job-vacancy/${job.id}`}
          className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Read more
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </Card>
  );
};

export default JobCard;