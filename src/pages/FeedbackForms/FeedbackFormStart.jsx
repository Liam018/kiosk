import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';

function FeedbackFormStart({ onStart }) {

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, []);


  if (pageLoading) {
      return (
        <div className="w-screen h-screen bg-teal-900 flex items-center justify-center">
          <div className="animate-bounce">
            <img
              src={logo}
              alt="Loading Logo"
              className="w-40 h-40 object-contain rounded-full border-2 border-white bg-white transform scale-100 hover:scale-110 transition-transform duration-1000"
            />
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen flex flex-col bg-teal-800 text-center">
      <div className="bg-white rounded-b-5xl py-20 sm:py-24 flex flex-col items-center transition-all duration-700 animate-fadeIn">
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 mb-4"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-800 px-4">
          Welcome to our Feedback Form!
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow px-4 transition-all duration-700 animate-fadeIn">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">Help Us Improve</h2>
        <p className="text-sm text-white mb-6 max-w-md">
          Your thoughts matter to us. Please take a moment to share your experience and help us improve our system.
        </p>
        <button
          onClick={onStart}
          className="bg-white text-yellow-600 font-semibold px-8 py-2.5 rounded-full shadow hover:bg-gray-100 transition duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default FeedbackFormStart;