import React, { useState } from 'react';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png';

function FeedbackFormFirst({ onNext, initialData = { name: '', role: '' } }) {
  const [name, setName] = useState(initialData.name || '');
  const [selectedRole, setSelectedRole] = useState(initialData.role || '');

  const roles = ['Student', 'Employee', 'Parent/Guardian', 'Visitor'];

  const handleNext = () => {
    if (name && selectedRole) {
      onNext({ name, role: selectedRole });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-4 sm:p-6 text-center transition-all duration-700 animate-fadeIn">
      {/* Header and Logo */}
      <div className="w-full max-w-lg">
        <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-3" />
        <h1 className="text-lg sm:text-xl font-bold text-teal-800">
          INTERACTIVE CAMPUS KIOSK WITH FEEDBACK MANAGEMENT SYSTEM
        </h1>
      </div>

      {/* Form */}
      <div className="w-full max-w-lg space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-teal-800 mb-2">Tell Us About Yourself</h2>
          <p className="text-sm text-gray-600">
            To help us understand your feedback better, please provide some basic information.
          </p>
        </div>

        {/* Name Input */}
        <div className="relative">
          <label className="text-sm font-medium text-teal-800 block mb-1.5">What’s your name?</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-teal-600">
              <User size={16} />
            </span>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-teal-600 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 placeholder:text-teal-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="text-sm font-medium text-teal-800 block mb-2">
            Which best describes you?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((role) => (
              <button
                key={role}
                className={`w-full border rounded-full py-2.5 text-sm font-medium ${
                  selectedRole === role
                    ? 'bg-teal-800 text-white border-teal-500'
                    : 'border-teal-600 text-teal-700 hover:bg-yellow-50'
                } transition duration-200`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full max-w-lg">
        <button
          disabled={!name || !selectedRole}
          onClick={handleNext}
          className="w-full bg-teal-800 text-white font-semibold py-2.5 rounded-full shadow hover:bg-teal-700 transition duration-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FeedbackFormFirst;