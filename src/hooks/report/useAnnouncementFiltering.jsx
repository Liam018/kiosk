import { useState } from "react";
import { toast } from "react-toastify";

const useAnnouncementFiltering = (archivedAnnouncements) => {
  // State for pagination, filters
  const [currentAnnPage, setCurrentAnnPage] = useState(1);
  const [announcementSearchQuery, setAnnouncementSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const itemsPerPage = 3;

  // Filter archived announcements based on search and date range
  const filteredAnnouncements = archivedAnnouncements.filter((ann) => {
    const annDate = new Date(ann.announcement_start_date);
    const matchesSearch =
      announcementSearchQuery === "" ||
      ann.announcement_title
        .toLowerCase()
        .includes(announcementSearchQuery.toLowerCase()) ||
      ann.announcement_id
        .toString()
        .toLowerCase()
        .includes(announcementSearchQuery.toLowerCase());
    const matchesDate =
      (!dateRange.start || annDate >= new Date(dateRange.start)) &&
      (!dateRange.end || annDate <= new Date(dateRange.end));
    return matchesSearch && matchesDate;
  });

  // Pagination for archived announcements
  const totalAnnPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentAnnPage - 1) * itemsPerPage,
    currentAnnPage * itemsPerPage
  );

  const clearDateRange = () => {
    setDateRange({ start: null, end: null });
    setAnnouncementSearchQuery("");
    setCurrentAnnPage(1);
  };

  // Handlers for pagination
  const handleAnnPreviousPage = () => {
    if (currentAnnPage > 1) setCurrentAnnPage(currentAnnPage - 1);
  };

  const handleAnnNextPage = () => {
    if (currentAnnPage < totalAnnPages) setCurrentAnnPage(currentAnnPage + 1);
  };

  return {
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
  };
};

export default useAnnouncementFiltering;