import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal";

export default function EditUserModal({ user, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    user_level: "admin",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        password: "",
        user_level: user.user_level,
      });
    }
    setShowConfirmation(false);
    setSubmitData(null);
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username) {
      toast.error("Please fill in all fields");
      return;
    }

    const dataToSubmit = {
      username: formData.username,
      user_level: formData.user_level,
      ...(formData.password && { password: formData.password }),
    };

    setSubmitData(dataToSubmit);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onSave(submitData);
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
    setSubmitData(null);
  };

  const getConfirmationMessage = () => {
    if (!submitData) return "";

    const changes = [];

    // Check username change
    if (user && submitData.username !== user.username) {
      changes.push(
        `username from "${user.username}" to "${submitData.username}"`
      );
    }

    // Check password change (only if new password was entered)
    if (submitData.password) {
      changes.push("password");
    }

    if (changes.length === 0) {
      return "No changes were made. Are you sure you want to proceed?";
    }

    return `Are you sure you want to update this user's ${changes.join(
      " and "
    )}?`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto shadow">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-25 transition-opacity"></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transition-all ease-in-out duration-700 animate-fadeIn">
          <div className="flex px-6 py-4 border-b border-gray-200 gap-10 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter new username"
                />
              </div>
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Leave it blank if you don't want to change the pass."
                />
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
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2"
              >
                Save
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
        title="Confirm User Update"
        message={getConfirmationMessage()}
      />
    </div>
  );
}
