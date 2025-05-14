import React, { useState, useEffect } from "react";
import useArchivedAnnouncements from "../hooks/report/useArchivedAnnouncements";
import useFeedbackData from "../hooks/feedback/useFeedbackData";
import useGenerateReport from "../hooks/report/useGenerateReport";
import useAnnouncementFiltering from "../hooks/report/useAnnouncementFiltering";
import { FeedbackChart } from "../components/FeedbackTableChart";
import ConfirmationModal from "../components/ConfirmationModal";
import useAnnouncementExport from "../hooks/report/useAnnouncementExport";
import useFeedbackExport from "../hooks/report/useFeedbackExport";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Download,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import DateRangeFilterModal from "../components/DateRangeFilterModal";

// Color mapping for ratings
const ratingColors = {
  Excellent: "#00796B",
  Good: "#4CAF50",
  Normal: "#CFD8DC",
  "Needs Improvement": "#AFB42B",
};

function GenerateReportItems() {
  const {
    archivedAnnouncements,
    loading: annLoading,
    error: annError,
    fetchArchivedAnnouncements,
  } = useArchivedAnnouncements();

  const { feedbacks, questionMap } = useFeedbackData();
  const { filterFeedbackByMonth, aggregateFeedbackData } = useGenerateReport();

  const {
    filteredAnnouncements,
    paginatedAnnouncements,
    currentAnnPage,
    totalAnnPages,
    announcementSearchQuery,
    dateRange,
    itemsPerPage,
    setAnnouncementSearchQuery,
    setDateRange,
    handleAnnPreviousPage,
    handleAnnNextPage,
    clearDateRange,
  } = useAnnouncementFiltering(archivedAnnouncements);

  const { handleAnnouncementExport } = useAnnouncementExport();

  // State for filters and modals
  const [selectedDate, setSelectedDate] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAnnConfirmModalOpen, setIsAnnConfirmModalOpen] = useState(false);
  const [isFeedbackConfirmModalOpen, setIsFeedbackConfirmModalOpen] =
    useState(false);

  // Fetch archived announcements on mount
  useEffect(() => {
    fetchArchivedAnnouncements();
  }, []);

  // Extract month and year from selectedDate for feedback
  const dateObj = selectedDate ? new Date(selectedDate + "-01") : null;
  const selectedMonth = dateObj
    ? dateObj.toLocaleString("default", { month: "long" })
    : "";
  const selectedYear = dateObj ? dateObj.getFullYear().toString() : "";

  // Filter and aggregate feedback
  const filteredFeedbacks = filterFeedbackByMonth(feedbacks, selectedDate);
  const feedbackData = aggregateFeedbackData(filteredFeedbacks, questionMap);
  const { handleFeedbackExport } = useFeedbackExport(
    selectedMonth,
    selectedYear,
    feedbackData
  );

  // Filter modal handlers
  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  const AnnouncementExport = () => {
    if (filteredAnnouncements.length === 0) {
      toast.error("The table is empty. Nothing to export!");
      return;
    }
    setIsAnnConfirmModalOpen(true);
  };

  const feedbackExport = () => {
    if (!filteredFeedbacks) {
      toast.error("Please select month export!");
      return;
    }

    if (filteredFeedbacks.length === 0) {
      toast.error("Selected month is empty. Nothing to export!");
      return;
    }

    setIsFeedbackConfirmModalOpen(true);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Archived Announcements Section */}
      <div className="bg-white shadow rounded-lg transition-all ease-in-out duration-700 animate-fadeIn">
        {annLoading && <div className="p-4 text-center">Loading...</div>}
        {annError && (
          <div className="p-4 text-red-500 text-center">{annError}</div>
        )}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-1 top-1 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search by ID or Title..."
                className="border rounded pl-9 py-2 w-auto hover:border-teal-700"
                value={announcementSearchQuery}
                onChange={(e) => setAnnouncementSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={openFilterModal}
              className="border rounded px-4 py-2 text-white bg-teal-700 hover:bg-teal-800  cursor-pointer"
            >
              <span className=" flex justify-center items-center">
                <Filter className="w-4 h-4" />
                Filter
              </span>
            </button>
            <button
              onClick={clearDateRange}
              className="flex justify-center items-center gap border rounded px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span>Clear</span>
            </button>
          </div>
          <button
            onClick={AnnouncementExport}
            className="flex justify-center items-center gap-1 bg-teal-700 text-white rounded px-4 py-2 hover:bg-teal-800 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="p-3 text-left">Announcement ID</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Announcement Title</th>
            </tr>
          </thead>
          <tbody>
            {annLoading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedAnnouncements.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No archived announcements available.
                </td>
              </tr>
            ) : (
              paginatedAnnouncements.map((ann) => (
                <tr
                  key={ann.announcement_id}
                  className="border-b border-gray-200"
                >
                  <td className="p-3">{ann.announcement_id}</td>
                  <td className="p-3">
                    {new Date(ann.announcement_start_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "2-digit",
                        day: "2-digit",
                        year: "2-digit",
                      }
                    )}
                  </td>
                  <td className="p-3">
                    {new Date(ann.announcement_end_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "2-digit",
                        day: "2-digit",
                        year: "2-digit",
                      }
                    )}
                  </td>
                  <td className="p-3">{ann.announcement_title}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center items-center p-4 gap-5">
          <button
            onClick={handleAnnPreviousPage}
            disabled={currentAnnPage === 1}
            className="text-teal-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span>
            {currentAnnPage} -{" "}
            {Math.min(
              currentAnnPage * itemsPerPage,
              filteredAnnouncements.length
            )}{" "}
            of {filteredAnnouncements.length}
          </span>
          <button
            onClick={handleAnnNextPage}
            disabled={currentAnnPage === totalAnnPages}
            className="text-teal-700 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white shadow rounded-lg transition-all ease-in-out duration-700 animate-fadeIn ">
        <div className="flex justify-end items-center p-4 border-b">
          <div className="flex gap-2">
            <input
              type="month"
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded p-2"
            />
            <button
              onClick={feedbackExport}
              className="flex justify-center items-center gap-1 bg-teal-700 hover:bg-teal-800 text-white rounded px-4 py-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-teal-700 text-white text-center">
              <th className="p-3 ">Feedback Date</th>
              <th className="w-5/12 px-4 py-2">Question</th>
                <th className="w-3/12 px-4 py-2">Chart</th>
                <th className="w-3/12 px-4 py-2">Results</th>
            </tr>
          </thead>
          <tbody>
            {!selectedDate ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Please select a month to view feedback.
                </td>
              </tr>
            ) : feedbackData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No feedback available for {selectedMonth} {selectedYear}.
                </td>
              </tr>
            ) : feedbackData.every((q) => !q.hasData) ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No ratings match the selected month.
                </td>
              </tr>
            ) : (
              feedbackData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-10 text-center text-sm">
                    {selectedMonth} {selectedYear}
                  </td>
                  <td className=" text-sm py-3 px-10 break-words ">{item.question}</td>
                  <td className="px-10 py-3">
                    <div className="flex justify-center">
                      {item.hasData ? (
                        <FeedbackChart data={item.data} questionId={item.id} />
                      ) : (
                        <span className="text-gray-500">No data</span>
                      )}
                    </div>
                  </td>
                  <td className="text-sm px-13 py-3">
                    <ul className="space-y-2">
                      {item.hasData ? (
                        <ul className="space-y-2">
                          {item.data.map((d) => (
                            <li
                              key={d.name}
                              className="flex items-center gap-1"
                            >
                              <span
                                className="w-4 h-4 rounded-full"
                                style={{
                                  backgroundColor:
                                    ratingColors[d.name] || "#000000",
                                }}
                              ></span>
                              <span>
                                {d.value}% {d.name} ({d.count})
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-center text-gray-500">No ratings</span>
                      )}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DateRangeFilterModal
        open={isFilterModalOpen}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onApply={() => setIsFilterModalOpen(false)}
        onClear={() => {
          setDateRange({ start: "", end: "" });
        }}
        onClose={closeFilterModal}
      />

      {/* Announcement Export Confirmation Modal */}
      <ConfirmationModal
        isOpen={isAnnConfirmModalOpen}
        onClose={() => setIsAnnConfirmModalOpen(false)}
        onConfirm={() => {
          handleAnnouncementExport(
            filteredAnnouncements,
            dateRange,
            announcementSearchQuery
          );
          setIsAnnConfirmModalOpen(false);
        }}
        title="Confirm Export"
        message="Are you sure you want to export the announcements report based on the current filters?"
      />

      {/* Feedback Export Confirmation Modal */}
      <ConfirmationModal
        isOpen={isFeedbackConfirmModalOpen}
        onClose={() => setIsFeedbackConfirmModalOpen(false)}
        onConfirm={() => {
          handleFeedbackExport();
          setIsFeedbackConfirmModalOpen(false);
        }}
        title="Confirm Feedback Export"
        message={`Are you sure you want to export the feedback report for ${selectedMonth} ${selectedYear}?`}
      />
    </div>
  );
}

export default GenerateReportItems;
