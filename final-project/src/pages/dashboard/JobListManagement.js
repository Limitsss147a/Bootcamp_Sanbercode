import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Spinner, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

const JobListManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const { token } = useAuth();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://final-project-api-alpha.vercel.app/api/jobs');
      setJobs(response.data.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async () => {
    if (!jobToDelete) return;

    try {
      await axios.delete(`https://final-project-api-alpha.vercel.app/api/jobs/${jobToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh data setelah berhasil hapus
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
    } finally {
      setShowModal(false);
      setJobToDelete(null);
    }
  };

  const openDeleteModal = (id) => {
    setJobToDelete(id);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Vacancy Management</h1>
        <Link to="/dashboard/list-job-vacancy/create">
          <Button color="success">Create New Job</Button>
        </Link>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Company</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {jobs.map((job) => (
            <Table.Row key={job.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {job.title}
              </Table.Cell>
              <Table.Cell>{job.company_name}</Table.Cell>
              <Table.Cell>{job.job_type}</Table.Cell>
              <Table.Cell>{job.job_status === 1 ? 'Open' : 'Closed'}</Table.Cell>
              <Table.Cell className="flex gap-2">
                <Link to={`/dashboard/list-job-vacancy/edit/${job.id}`}>
                  <Button color="warning" size="sm">Edit</Button>
                </Link>
                <Button color="failure" size="sm" onClick={() => openDeleteModal(job.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      {/* Modal Konfirmasi Hapus */}
      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this job?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobListManagement;