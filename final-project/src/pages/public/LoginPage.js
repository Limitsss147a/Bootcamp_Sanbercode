import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      navigate('/dashboard'); // Arahkan ke dashboard setelah login
    } catch (err) {
      setError('Login failed. Please check your email and password.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <Alert color="failure">{error}</Alert>}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Login</Button>
          <p className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;