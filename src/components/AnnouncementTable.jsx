import React from "react";
import { Edit2, Archive } from "lucide-react";
import EditAnnounceModal from "./EditAnnounceModal";
import useAnnouncementTable from "../hooks/announcements/useAnnouncementTable";
import ConfirmationModal from "./ConfirmationModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnnouncementTable = ({ selectedDate, announcements, onRefresh }) => {
  const {
    isModalOpen,
    confirmation,
    selectedAnnounce,
    loading,
    currentPage,
    totalItems,
    totalPages,
    currentItems,
    getPaginationRange,
    handlePageChange,
    handleEditClick,
    handleArchiveClick,
    openConfirmationForm,
    setConfirmation,
    setIsModalOpen,
  } = useAnnouncementTable({ selectedDate, announcements, onRefresh });

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-7">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Date (Start - End)
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((ann, index) => {
                const startDate = new Date(ann.announcement_start_date);
                const endDate = new Date(ann.announcement_end_date);

                return (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-4">
                      {startDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          })} -{" "}
                      {endDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric"
                          })}
                    </td>
                    <td className="px-6 py-4">{ann.announcement_title}</td>
                    <td className="px-6 py-4 truncate max-w-xs">
                      {ann.announcement_description}
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      <button
                        className="text-teal-600 hover:text-teal-800 group relative inline-block cursor-pointer"
                        onClick={() => handleEditClick(ann)}
                      >
                        <Edit2 className="w-4 h-4 " />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-teal-900 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                          Edit
                        </span>
                      </button>
                      <button
                        className="text-teal-600 hover:text-teal-800 group relative inline-block cursor-pointer"
                        // onClick={() => handleArchiveClick(ann.announcement_id)}
                        onClick={() => openConfirmationForm(ann)}
                        disabled={loading}
                      >
                        <Archive className="w-4 h-4 text-yellow-500" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-teal-900 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                          Archive
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No announcements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 5 && (
        <div className="flex justify-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 ml-0 leading-tight border border-gray-300 rounded-l-lg ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 bg-white hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>
              </li>
              {getPaginationRange().map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 leading-tight border border-gray-300 ${
                      page === currentPage
                        ? "text-teal-600 bg-teal-50"
                        : "text-gray-500 bg-white hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 leading-tight border border-gray-300 rounded-r-lg ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 bg-white hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <EditAnnounceModal
        announce={selectedAnnounce}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={onRefresh}
      />

      <ConfirmationModal
        isOpen={confirmation}
        onClose={() => {
          setConfirmation(false);
        }}
        onConfirm={() => handleArchiveClick(selectedAnnounce?.announcement_id)}
        title="Confirm Archive"
        message={`Are you sure you want to archive "${selectedAnnounce?.announcement_title}"?`}
      />
    </div>
  );
};

export default AnnouncementTable;
