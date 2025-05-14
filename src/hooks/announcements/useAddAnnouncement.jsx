import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useAddAnnouncement = ({ isOpen, onClose, onAnnouncementCreated }) => {
  const [formData, setFormData] = useState({
    announcement_title: "",
    announcement_description: "",
    announcement_start_date: "",
    announcement_end_date: "",
  });
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setFormData({
        announcement_title: "",
        announcement_description: "",
        announcement_start_date: today,
        announcement_end_date: "",
      });
    }
  }, [isOpen]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);

    // Validate fields
    if (
      !formData.announcement_title ||
      !formData.announcement_description ||
      !formData.announcement_start_date ||
      !formData.announcement_end_date
    ) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Validate date range
    const startDate = new Date(formData.announcement_start_date);
    const endDate = new Date(formData.announcement_end_date);

    if (endDate < startDate) {
      toast.error("End date must be same or after start date");
      setLoading(false);
      return;
    }

    try {
      const startDateTime = new Date(startDate.setHours(0, 0, 0, 0)).toISOString(); 
      const endDateTime = new Date(endDate.setHours(23, 59, 59, 999)).toISOString(); 
      const response = await axios.post(
        "http://127.0.0.1:8000/users/announcement/",
        
        {
          announcement_title: formData.announcement_title,
          announcement_description: formData.announcement_description,
          announcement_start_date: startDateTime,
          announcement_end_date: endDateTime,
        },
        {
          withCredentials: true, 
        }
      );
      toast.success("Announcement created successfully");
      onAnnouncementCreated();
      onClose();
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Failed to create announcement");
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

export default useAddAnnouncement;