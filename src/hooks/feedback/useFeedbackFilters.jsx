import { useState } from "react";

const useFeedbackFilters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  return {
    showFilters,
    setShowFilters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleResetFilters,
  };
};

export default useFeedbackFilters