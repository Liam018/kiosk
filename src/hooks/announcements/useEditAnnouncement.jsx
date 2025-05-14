import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useEditAnnouncement = ({ isOpen, onClose, onRefresh, announce }) => {
  const [formData, setFormData] = useState({
    announcement_title: "",
    announcement_description: "",
    announcement_start_date: "",
    announcement_end_date: "",
  });
  const [loading, setLoading] = useState(false);

  // Update form data when announce prop changes
  useEffect(() => {
    if (announce && announce.announcement_id) {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        // Extract local date components to avoid UTC shift
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      setFormData({
        announcement_title: announce.announcement_title || "",
        announcement_description: announce.announcement_description || "",
        announcement_start_date: formatDate(announce.announcement_start_date),
        announcement_end_date: formatDate(announce.announcement_end_date),
      });
    }
  }, [announce]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!announce || !announce.announcement_id) {
      toast.error("Error: Invalid announcement data.");
      setLoading(false);
      return;
    }

    const startDate = new Date(formData.announcement_start_date);
    const endDate = new Date(formData.announcement_end_date);

    const tempStartDate = new Date(startDate);
    const tempEndDate = new Date(endDate);

    tempStartDate.setHours(0, 0, 0, 0);
    tempEndDate.setHours(23, 59, 59, 999);

    const startDateTime = tempStartDate.toISOString();
    const endDateTime = tempEndDate.toISOString();

    if (endDate < startDate) {
      toast.error("End date must be after start date");
      setLoading(false);
      return;
    }

    try {
      const updatedData = {
        announcement_title: formData.announcement_title,
        announcement_description: formData.announcement_description,
        announcement_start_date: startDateTime,
        announcement_end_date: endDateTime,
      };

      await axios.patch(
        `http://127.0.0.1:8000/users/announcement/${announce.announcement_id}/`,
        updatedData
      );

      toast.success("Announcement updated successfully");
      onClose();
      onRefresh();
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Failed to update announcement");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useEditAnnouncement;
