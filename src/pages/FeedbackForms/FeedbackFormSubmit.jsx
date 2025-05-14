import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import logo from '../../assets/logo.png';

function FeedbackFormSubmit({ userInfo, initialRatings = {}, onBack, onSubmit, questions }) {
  const defaultOptions = ['Excellent', 'Good', 'Normal', 'Needs improvement'];

  const [ratings, setRatings] = useState(() => initialRatings);

  const handleRatingChange = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  const allAnswered = questions.every((q) => ratings[q.id]);

  const handleSubmitClick = () => {
    onSubmit(ratings);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 sm:p-6 text-center transition-all duration-700 animate-fadeIn">
      {/* Header */}
      <div className="w-full max-w-lg">
        <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-3" />
        <h1 className="text-lg sm:text-xl font-bold text-teal-800">
          INTERACTIVE CAMPUS KIOSK WITH FEEDBACK MANAGEMENT SYSTEM
        </h1>
      </div>

      {/* Scrollable Form Content */}
      <div className="w-full max-w-lg flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100 mt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-teal-800">Share Your Thoughts</h2>
            <p className="text-sm text-gray-600 mt-1.5">
              Your feedback helps us improve the campus experience.
            </p>
          </div>

          <div className="space-y-10">
            {questions.map(({ id, text }, idx) => (
              <div key={id} className="text-left">
                <p className="text-sm font-medium text-teal-800 mb-3">{text}</p>
                <div className="space-y-2.5">
                  {defaultOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2.5">
                      <input
                        type="radio"
                        name={id}
                        className="h-4 w-4 text-yellow-600 border-yellow-600 focus:ring-yellow-500"
                        checked={ratings[id] === option}
                        onChange={() => handleRatingChange(id, option)}
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>  
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-lg flex justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center justify-center px-6 py-2.5 border border-teal-800 text-teal-800 font-medium rounded-full hover:bg-teal-50 transition duration-200"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </button>
        <button
          onClick={handleSubmitClick}
          disabled={!allAnswered}
          className="px-6 py-2.5 bg-teal-800 text-white font-semibold rounded-full shadow hover:bg-teal-700 transition duration-200 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FeedbackFormSubmit;