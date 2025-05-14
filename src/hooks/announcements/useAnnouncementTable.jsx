import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useAnnouncementTable = ({ selectedDate, announcements, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnounce, setSelectedAnnounce] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = announcements.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = announcements.slice(startIndex, endIndex);

  // Generate pagination numbers (max 7 at a time)
  const getPaginationRange = () => {
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditClick = (announce) => {
    setSelectedAnnounce(announce);
    setIsModalOpen(true);
  };

  const openConfirmationForm = (announcement) => {
    setSelectedAnnounce(announcement)
    setConfirmation(true);
  }

  const handleArchiveClick = async (id) => {  
    try {
      setLoading(true);
      await axios.patch(`http://192.168.0.213:8000/users/announcement/${id}/`, {
        is_archived: true,
      },
      {
        withCredentials: true,
      }
    
    );
      toast.success("Announcement archived successfully");
      onRefresh();
    } catch (error) {
      console.error("Error archiving announcement:", error);
      toast.error("Failed to archive announcement");
    } finally {
      setLoading(false);
    }
  };

  return {
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
    setIsModalOpen,
    setConfirmation,
    openConfirmationForm,
    
  };
};

export default useAnnouncementTable;