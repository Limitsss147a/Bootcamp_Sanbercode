import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await axios.post('https://final-project-api-alpha.vercel.app/api/auth/register', formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Tunggu 2 detik sebelum redirect
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        {error && <Alert color="failure">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name" value="Full Name" />
            <TextInput id="name" type="text" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="image_url" value="Profile Picture URL" />
            <TextInput id="image_url" type="text" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput id="email" type="email" placeholder="name@example.com" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="password" value="Password (min. 8 characters)" />
            <TextInput id="password" type="password" required onChange={handleChange} />
          </div>
          <Button type="submit">Register</Button>
          <p className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;