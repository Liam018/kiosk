import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useArchiveModal = ({ isOpen, onClose, onRestore }) => {
  const [archivedAnnouncements, setArchivedAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [restoreFormOpen, setRestoreFormOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  // Fetch archived announcements when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchArchivedAnnouncements();
    }
  }, [isOpen]);

  const fetchArchivedAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.0.213:8000/users/announcement/archived/", {
        withCredentials: true,
      });
      setArchivedAnnouncements(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching archived announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredAnnouncements = archivedAnnouncements.filter((announcement) =>
    announcement.announcement_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.announcement_description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const openRestoreForm = (announcement) => {
    setSelectedAnnouncement(announcement);
    setNewStartDate(new Date(announcement.announcement_start_date).toISOString().split("T")[0]);
    setNewEndDate(new Date(announcement.announcement_end_date).toISOString().split("T")[0]);
    setRestoreFormOpen(true);
  };

  const closeRestoreForm = () => {
    setRestoreFormOpen(false);
    setSelectedAnnouncement(null);
    setNewStartDate("");
    setNewEndDate("");
  };

  const handleRestoreSubmit = (e) => {
    e.preventDefault();
    if (!newStartDate || !newEndDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (new Date(newStartDate) > new Date(newEndDate)) {
      toast.error("Start date must be before or equal to end date.");
      return;
    }
    setIsConfirmationOpen(true);
  };

  const confirmRestore = async () => {

    if (!newStartDate || !newEndDate) {
      toast.error("Please provide valid start and end dates.");
      setLoading(false);
      return;
    }

    // Convert newStartDate and newEndDate to Date objects
    const startDate = new Date(newStartDate);
    const endDate = new Date(newEndDate);

    // Validate date format
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      toast.error("Invalid date format. Please provide valid dates.");
      setLoading(false);
      return;
    }

    if (endDate < startDate) {
      toast.error("End date must be the same or after start date.");
      setLoading(false);
      return;
    } 
  
    try {
      setLoading(true);
      // Add time components to dates
      const tempStartDate = new Date(startDate); 
      const tempEndDate = new Date(endDate);     

      tempStartDate.setHours(0, 0, 0, 0);        
      tempEndDate.setHours(23, 59, 59, 999);    

      const startDateTime = tempStartDate.toISOString();
      const endDateTime = tempEndDate.toISOString();
      await axios.patch(
        `http://192.168.0.213:8000/users/announcement/${selectedAnnouncement.announcement_id}/`, 
        {
          is_archived: false,
          views: 0,
          announcement_start_date: startDateTime,
          announcement_end_date: endDateTime,
        }
      );
      toast.success("Announcement restored successfully");
      onRestore();
      await fetchArchivedAnnouncements();
      closeRestoreForm();
      setIsConfirmationOpen(false);
      onClose();
    } catch (error) {
      toast.error("Failed to restore announcement");
      setIsConfirmationOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    fetchArchivedAnnouncements,
    handleSearchChange,
    openRestoreForm,
    closeRestoreForm,
    handleRestoreSubmit,
    confirmRestore,
    setNewStartDate,
    setNewEndDate,
    setIsConfirmationOpen,
    setSearchQuery
  };
};

export default useArchiveModal;