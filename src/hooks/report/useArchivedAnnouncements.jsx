import { useState, useEffect } from "react";
import axios from "axios";

const useArchivedAnnouncements = () => {
  const [archivedAnnouncements, setArchivedAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArchivedAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/announcement/archived/", {
        withCredentials: true,
      });
      const formattedAnnouncements = response.data.map((announcement) => ({
        ...announcement,
        announcement_start_date: new Date(announcement.announcement_start_date),
        announcement_end_date: new Date(announcement.announcement_end_date),
      }));
      setArchivedAnnouncements(formattedAnnouncements);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching archived announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedAnnouncements();
  }, []);

  return { archivedAnnouncements, loading, error, fetchArchivedAnnouncements };
};

export default useArchivedAnnouncements;