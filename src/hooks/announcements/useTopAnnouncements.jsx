import { useState, useEffect } from "react";
import axios from "axios";

const useTopAnnouncements = () => {
  const [topAnnouncements, setTopAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/users/announcement/top/",
        { withCredentials: true }
      );
      setTopAnnouncements(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching top announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAnnouncements();
    const interval = setInterval(fetchTopAnnouncements, 3000); //fetch views count every 3 sec
    return () => clearInterval(interval);
  }, []);

  return { topAnnouncements };
};

export default useTopAnnouncements;