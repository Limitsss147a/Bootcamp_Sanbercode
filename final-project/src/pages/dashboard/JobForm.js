import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Card, Label, TextInput, Textarea, Button, Select } from 'flowbite-react';

const JobForm = () => {
  const { id } = useParams(); // Cek apakah ada ID di URL (untuk mode edit)
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    job_description: '',
    job_qualification: '',
    job_type: 'On-site',
    job_tenure: 'Full-time',
    job_status: 1,
    company_name: '',
    company_image_url: '',
    company_city: '',
    salary_min: '',
    salary_max: '',
  });

  useEffect(() => {
    if (id) {
      // Jika ada ID, ini adalah mode EDIT. Ambil data pekerjaan.
      const fetchJobData = async () => {
        try {
          const response = await axios.get(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`);
          setFormData(response.data.data);
        } catch (error) {
          console.error('Failed to fetch job data:', error);
        }
      };
      fetchJobData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id
      ? `https://final-project-api-alpha.vercel.app/api/jobs/${id}` // URL untuk UPDATE
      : 'https://final-project-api-alpha.vercel.app/api/jobs'; // URL untuk CREATE
    const method = id ? 'put' : 'post';

    try {
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard/list-job-vacancy'); // Kembali ke tabel setelah berhasil
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold">{id ? 'Edit Job Vacancy' : 'Create New Job Vacancy'}</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Kolom Kiri */}
        <div>
          <div className="mb-4">
            <Label htmlFor="title" value="Job Title" />
            <TextInput id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="company_name" value="Company Name" />
            <TextInput id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="company_city" value="Company City" />
            <TextInput id="company_city" name="company_city" value={formData.company_city} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="company_image_url" value="Company Image URL" />
            <TextInput id="company_image_url" name="company_image_url" value={formData.company_image_url} onChange={handleChange} required />
          </div>
          <div className="flex gap-4">
            <div className="mb-4 w-full">
                <Label htmlFor="salary_min" value="Minimum Salary" />
                <TextInput id="salary_min" name="salary_min" type="number" value={formData.salary_min} onChange={handleChange} required />
            </div>
            <div className="mb-4 w-full">
                <Label htmlFor="salary_max" value="Maximum Salary" />
                <TextInput id="salary_max" name="salary_max" type="number" value={formData.salary_max} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div>
          <div className="mb-4">
            <Label htmlFor="job_description" value="Job Description" />
            <Textarea id="job_description" name="job_description" value={formData.job_description} onChange={handleChange} required rows={4} />
          </div>
          <div className="mb-4">
            <Label htmlFor="job_qualification" value="Job Qualification" />
            <Textarea id="job_qualification" name="job_qualification" value={formData.job_qualification} onChange={handleChange} required rows={4} />
          </div>
          <div className="flex gap-4">
            <div className="mb-4 w-full">
                <Label htmlFor="job_type" value="Job Type" />
                <Select id="job_type" name="job_type" value={formData.job_type} onChange={handleChange}>
                    <option>On-site</option>
                    <option>Work From Home</option>
                    <option>Hybrid</option>
                </Select>
            </div>
            <div className="mb-4 w-full">
                <Label htmlFor="job_tenure" value="Job Tenure" />
                <Select id="job_tenure" name="job_tenure" value={formData.job_tenure} onChange={handleChange}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                </Select>
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="job_status" value="Job Status" />
            <Select id="job_status" name="job_status" value={formData.job_status} onChange={handleChange}>
              <option value={1}>Open</option>
              <option value={0}>Closed</option>
            </Select>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit">{id ? 'Update Job' : 'Create Job'}</Button>
        </div>
      </form>
    </Card>
  );
};

export default JobForm;