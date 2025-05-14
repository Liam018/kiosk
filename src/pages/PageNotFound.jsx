import React from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle } from 'lucide-react';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
        <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6">Oops! Page not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
export default PageNotFound;
