import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white">404</h1>
      <p className="text-2xl font-semibold md:text-3xl mt-4">Sorry, we couldn't find this page.</p>
      <p className="mt-4 mb-8 text-gray-500 dark:text-gray-400">
        But don't worry, you can find plenty of other things on our homepage.
      </p>
      <Link to="/">
        <Button color="info" size="lg">Back to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;