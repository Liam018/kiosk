import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal";

export default function AddUserModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    user_level: "admin",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        user_level: "admin",
      });
      setConfirmPasswordError("");
      setShowConfirmation(false);
      setSubmitData(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate confirmPassword
    if (name === "confirmPassword") {
      if (value && formData.password && value !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    } else if (name === "password" && formData.confirmPassword) {
      // Re-validate confirmPassword when password changes
      if (formData.confirmPassword !== value) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.user_level
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const dataToSubmit = {
      username: formData.username,
      password: formData.password,
      user_level: formData.user_level,
    };

    setSubmitData(dataToSubmit);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onAdd(submitData);
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
    setSubmitData(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto shadow">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-25 transition-opacity"></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transition-all ease-in-out duration-700 animate-fadeIn">
          <div className="flex px-6 py-4 border-b border-gray-200 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Add User</h2>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter username"
                  // required
                />
              </div>
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Enter new password"
                  // required
                />
              </div>
              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm new password"
                  // required
                />
                {confirmPasswordError && (
                  <p className="mt-1 text-xs text-red-500">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              {/* Role Field */}
              <div>
                <label
                  htmlFor="user_level"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="user_level"
                  name="user_level"
                  value={formData.user_level}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                >
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
        title="Confirm User Creation"
        message={`Are you sure you want to create a new admin user "${submitData?.username}"?`}
      />
    </div>
  );
}
