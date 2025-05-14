import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useEditAnnouncement from "../hooks/announcements/useEditAnnouncement";
import ConfirmationModal from "./ConfirmationModal";

export default function EditAnnounceModal({
  isOpen,
  onClose,
  onRefresh,
  announce,
}) {
  const { formData, loading, handleChange, handleSubmit } = useEditAnnouncement(
    {
      isOpen,
      onClose,
      onRefresh,
      announce,
    }
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.announcement_title ||
      !formData.announcement_description ||
      !formData.announcement_start_date ||
      !formData.announcement_end_date
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate date range
    const startDate = new Date(formData.announcement_start_date);
    const endDate = new Date(formData.announcement_end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      toast.error("Invalid date format");
      return;
    }

    if (endDate < startDate) {
      toast.error("End date must be after start date");
      return;
    }

    const dataToSubmit = {
      announcement_id: announce?.announcement_id,
      announcement_title: formData.announcement_title,
      announcement_description: formData.announcement_description,
      announcement_start_date: formData.announcement_start_date,
      announcement_end_date: formData.announcement_end_date,
    };
    setSubmitData(dataToSubmit);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    handleSubmit(submitData);
    setShowConfirmation(false);
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
  };

  // Generate the confirmation message showing changes
  const getConfirmationMessage = () => {
    if (!announce) return "Are you sure you want to save these changes?";

    const changes = [];

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    };

    //compare dates to check if they are equal
    const datesAreEqual = (date1, date2) => {
      if (!date1 || !date2) return false;
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    };

    // Check title change
    if (announce.announcement_title !== formData.announcement_title) {
      changes.push(
        `title from "${announce.announcement_title}" to "${formData.announcement_title}"`
      );
    }

    // Check description change
    if (
      announce.announcement_description !== formData.announcement_description
    ) {
      changes.push("description");
    }

    // Check start date change
    if (
      !datesAreEqual(
        announce.announcement_start_date,
        formData.announcement_start_date
      )
    ) {
      changes.push(
        `start date from ${formatDate(
          announce.announcement_start_date
        )} to ${formatDate(formData.announcement_start_date)}`
      );
    }

    // Check end date change
    if (
      !datesAreEqual(
        announce.announcement_end_date,
        formData.announcement_end_date
      )
    ) {
      changes.push(
        `end date from ${formatDate(
          announce.announcement_end_date,
        )} to ${formatDate(formData.announcement_end_date)}`
      );
    }

    if (changes.length === 0) {
      return "No changes were made. Are you sure you want to proceed?";
    }

    return `Are you sure you want to update this announcement's ${changes.join(
      " and "
    )}?`;
  }
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto shadow">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-25 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full mx-auto transition-all ease-in-out duration-700 animate-fadeIn">
          <div className="flex px-6 py-4 border-b border-gray-200 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Announcement
            </h2>
          </div>

          <form onSubmit={handleFormSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="announcement_start_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="announcement_start_date"
                    name="announcement_start_date"
                    value={formData.announcement_start_date}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="announcement_end_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="announcement_end_date"
                    name="announcement_end_date"
                    value={formData.announcement_end_date}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-teal-500 focus:border-teal-500"
                    min={formData.announcement_start_date}
                    required
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="announcement_title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="announcement_title"
                  name="announcement_title"
                  value={formData.announcement_title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter title"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="announcement_description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="announcement_description"
                  name="announcement_description"
                  value={formData.announcement_description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter content"
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
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
        title="Confirm Announcement Update"
        message={getConfirmationMessage()}
      />
    </div>
  );
}
