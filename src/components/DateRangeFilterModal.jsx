import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const DateRangeFilterModal = ({
  open,
  dateRange,
  setDateRange,
  onApply,
  onClear,
  onClose,
}) => {
  const [localRange, setLocalRange] = useState(dateRange);

  useEffect(() => {
    setLocalRange(dateRange);
  }, [dateRange]);

  const handleChange = (e) => {
    setLocalRange({ ...localRange, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    if (
      localRange.start &&
      localRange.end &&
      localRange.start > localRange.end
    ) {
      toast.error("End date must be the same or after the start date.");
      return;
    }

    if (localRange.start == null || localRange.end == null) {
      toast.error("Please select Start and end dates to apply.");
      return;
    }
    setDateRange(localRange);
    onApply && onApply();
  };

  const handleClear = () => {
    setLocalRange({ start: "", end: "" });
    setDateRange({ start: "", end: "" });
    onClear && onClear();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md z-10">
        <h3 className="text-lg mb-4 font-bold text-teal-700">
          Filter by Date Range
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="start" className="block mb-1 font-semibold">
              Start Date
            </label>
            <input
              type="date"
              id="start"
              name="start"
              value={localRange.start || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="Start Date"
            />
          </div>
          <div>
            <label htmlFor="end" className="block mb-1 font-semibold">
              End Date
            </label>
            <input
              type="date"
              id="end"
              name="end"
              value={localRange.end || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="End Date"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleClear}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-4 py-2"
              type="button"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="bg-teal-700 text-white rounded px-4 py-2 hover:bg-teal-800"
              type="button"
            >
              Apply
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white rounded px-4 py-2"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilterModal;
