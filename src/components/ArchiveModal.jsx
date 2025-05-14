import React from "react";
import { useEffect } from "react";
import { ArchiveRestore, Search, X } from "lucide-react";
import useArchiveModal from "../hooks/announcements/useArchiveModal";
import ConfirmationModal from "./ConfirmationModal";

const ArchiveModal = ({ isOpen, onClose, onRestore }) => {
  const {
    archivedAnnouncements,
    loading,
    error,
    restoreFormOpen,
    selectedAnnouncement,
    newStartDate,
    newEndDate,
    isConfirmationOpen,
    searchQuery,
    filteredAnnouncements,
    openRestoreForm,
    closeRestoreForm,
    handleRestoreSubmit,
    confirmRestore,
    setNewStartDate,
    setNewEndDate,
    setIsConfirmationOpen,
    handleSearchChange,
    setSearchQuery,
  } = useArchiveModal({ isOpen, onClose, onRestore });

  if (!isOpen) return null;

  const handleClose = () => {
    setSearchQuery("");
    closeRestoreForm();
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 ">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-25 "></div>
      <div className="bg-white rounded-lg shadow-xl h-full w-full max-w-3xl max-h-[60vh] overflow-y-hidden transition-all ease-in-out duration-700 animate-fadeIn">
        <div className="p-6 ">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : archivedAnnouncements.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No archived announcements
            </div>
          ) : !restoreFormOpen ? (
            <div>
              <div className="flex justify-center">
                <div className="flex items-center gap-16 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Archived Announcements
                  </h2>

                  {/* Search */}
                  <div className="relative w-full sm:w-80">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="table-search-users"
                      className="block w-full px-4 py-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Search....."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 text-3xl"
                  >
                    <X className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
              {filteredAnnouncements.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No matching announcements found
                </div>
              ) : (
                <div className="overflow-x-auto max-h-[60vh]">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date Range
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...filteredAnnouncements]
                        .sort(
                          (a, b) =>
                            new Date(b.announcement_start_date) -
                            new Date(a.announcement_start_date)
                        )
                        .map((announcement) => (
                          <tr
                            key={announcement.announcement_id}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="px-6 py-4">
                              {announcement.announcement_title}
                            </td>
                            <td className="px-6 py-4 truncate max-w-xs">
                              {announcement.announcement_description}
                            </td>
                            <td className="px-6 py-4">
                              {new Date(
                                announcement.announcement_start_date
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}{" "}
                              to{" "}
                              {new Date(
                                announcement.announcement_end_date
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => openRestoreForm(announcement)}
                                className="text-teal-600 hover:text-teal-800 flex items-center cursor-pointer"
                                disabled={loading}
                              >
                                <ArchiveRestore className="w-4 h-4 mr-1" />
                                Restore
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-10">
                Restore Announcement: {selectedAnnouncement?.announcement_title}
                <p className="truncate max-w-md">
                  Description: {selectedAnnouncement?.announcement_description}
                </p>
              </h3>
              <form onSubmit={handleRestoreSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeRestoreForm}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                    disabled={loading}
                  >
                    {loading ? "Restoring..." : "Restore"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmRestore}
        title="Confirm Restoration"
        message={`Are you sure you want to restore "${selectedAnnouncement?.announcement_title}" with new dates: ${newStartDate} to ${newEndDate}?`}
      />
    </div>
  );
};

export default ArchiveModal;
