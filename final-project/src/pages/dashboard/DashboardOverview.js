import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from 'flowbite-react';

const DashboardOverview = () => {
  // Kita bisa ambil data user dari context untuk personalisasi
  const { user } = useAuth();

  return (
    <Card>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard, {user ? user.name : 'User'}!</h1>
      <p className="text-gray-600 dark:text-gray-400">
        This is your central hub for managing job vacancies. You can create new job listings, edit existing ones, or remove them as needed.
      </p>
      <p>Use the sidebar navigation to get started.</p>
    </Card>
  );
};

export default DashboardOverview;