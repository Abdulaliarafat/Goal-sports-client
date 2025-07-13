import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl text-error mb-4">
          <FaLock />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-error">403 - Forbidden</h1>
        <p className="mb-6 text-red-600">
          Sorry, you don't have permission to access this page.
        </p>
        <Link to="/" className="btn btn-primary bg-red-600 text-white">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
