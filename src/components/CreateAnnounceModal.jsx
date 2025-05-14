import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAddAnnouncement from "../hooks/announcements/useAddAnnouncement";
import ConfirmationModal from "./ConfirmationModal";

export default function CreateAnnounceModal({
  isOpen,
  onClose,
  onAnnouncementCreated,
}) {
  const { formData, loading, handleChange, handleSubmit } = useAddAnnouncement({
    isOpen,
    onClose,
    onAnnouncementCreated,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.announcement_start_date ||
      !formData.announcement_end_date ||
      !formData.announcement_title ||
      !formData.announcement_description
    ) {
      toast.error(
        <span>
          Please fill in all required fields.{" "}
          <span style={{ color: "red" }}>(*)</span>
        </span>
      );
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    handleSubmit();
    setShowConfirmation(false);
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto shadow">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-25"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full mx-auto transition-all ease-in-out duration-700 animate-fadeIn">
          <div className="flex px-6 py-4 border-b border-gray-200 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Create Announcement
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
                    min={new Date().toISOString().split("T")[0]}
                    // required
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
                    min={
                      formData.announcement_start_date ||
                      new Date().toISOString().split("T")[0]
                    }
                    // required
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
                  // required
                />
              </div>

              {/* Description */}
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
                  // required
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
                {loading ? "Creating..." : "Create"}
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
        title="Confirm Announcement Creation"
        message={
          <div>
            <strong>Title:</strong> {formData.announcement_title}
            <br />
            <strong>Dates:</strong> {formData.announcement_start_date} to{" "}
            {formData.announcement_end_date}
            <br />
            <strong>Description:</strong>{" "}
            {formData.announcement_description.substring(0, 50)}
            {formData.announcement_description.length > 50 ? "..." : ""}
          </div>
        }
      />
    </div>
  );
}
