import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useAnnouncements = () => {
  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const pickerRef = useRef(null);

  // Fetch announcements from Django API
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.0.213:8000/users/announcement/", {
        withCredentials: true,
      });
      const formattedAnnouncements = response.data.map((announcement) => ({
        ...announcement,
        announcement_start_date: new Date(announcement.announcement_start_date),
        announcement_end_date: new Date(announcement.announcement_end_date),
      }));
      setAnnouncements(formattedAnnouncements);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  // Increment views for an announcement
  const incrementAnnouncementViews = async (announcementId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/users/announcement/${announcementId}/increment-views/`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(`Error incrementing views for announcement ${announcementId}:`, err);
    }
  };

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter announcements 
  const filteredAnnouncements = announcements.filter((ann) => {
    const startDate = new Date(ann.announcement_start_date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(ann.announcement_end_date);
    endDate.setHours(23, 59, 59, 999);
  
    const matchesSearch =
      searchQuery === "" ||
      ann.announcement_title.toLowerCase().includes(searchQuery) ||
      ann.announcement_description.toLowerCase().includes(searchQuery);
  
    if (searchQuery !== "") {
      return matchesSearch;
    }
  
    // If there's no search, filter by selected date (if selected)
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    if (selectedDateObj) selectedDateObj.setHours(0, 0, 0, 0);
  
    const matchesDate =
      !selectedDateObj ||
      (startDate <= selectedDateObj && endDate >= selectedDateObj && !ann.is_archived);
  
    return matchesDate;
  });
  

  // Get days in the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days array
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }
    return daysArray;
  };

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Handle date selection
  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };

  // Check if a day is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day &&
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Handle month/year selection
  const handleMonthYearChange = (month, year) => {
    setCurrentDate(new Date(year, month));
    setIsPickerOpen(false);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerOpen(false);
      }
    };
    if (isPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPickerOpen]);

  // Add announcement
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  // Refresh announcements after creating a new one
  const handleAnnouncementCreated = () => {
    fetchAnnouncements();
  };

  // Calendar utilities
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );
  const formatMonthYear = () => {
    return currentDate.toLocaleString("default", { month: "long", year: "numeric" });
  };
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const calendarDays = generateCalendar();

  // Initial fetch
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    currentDate,
    selectedDate,
    isPickerOpen,
    announcements,
    isModalOpen,
    isArchiveModalOpen,
    loading,
    error,
    searchQuery,
    pickerRef,
    filteredAnnouncements,
    fetchAnnouncements,
    incrementAnnouncementViews,
    handleSearchChange,
    setIsPickerOpen,
    getDaysInMonth,
    getFirstDayOfMonth,
    generateCalendar,
    goToPreviousMonth,
    goToNextMonth,
    handleDateClick,
    isToday,
    handleMonthYearChange,
    handleAddClick,
    handleAnnouncementCreated,
    setIsModalOpen,
    setIsArchiveModalOpen,
    years,
    months,
    formatMonthYear,
    daysOfWeek,
    calendarDays,
  };
};

export default useAnnouncements;