import React from 'react';
import logo from '../../assets/logo.png';

function ThankYouForm({ onRestart }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-4 sm:p-6 text-center transition-all duration-700 animate-fadeIn">

      <div className="w-full max-w-lg">
        <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-3" />
        <h1 className="text-lg sm:text-xl font-bold text-teal-800">
          INTERACTIVE CAMPUS KIOSK WITH FEEDBACK MANAGEMENT SYSTEM
        </h1>
      </div>

      <div className="w-full max-w-lg space-y-6">
        <h2 className="text-2xl sm:text-4xl font-semibold text-teal-800">Thank You!</h2>
        <p className="text-lg text-gray-600">
          We appreciate your feedback. Your input helps us improve the campus experience.
        </p>
      </div>


      <div className="w-full max-w-lg">
        <button
          onClick={onRestart}
          className="w-full bg-teal-700 text-white font-semibold py-2.5 rounded-full shadow hover:bg-teal-800 cursor-pointer transition duration-200"
        >
          Submit Another Feedback
        </button>
      </div>
    </div>
  );
}

export default ThankYouForm;