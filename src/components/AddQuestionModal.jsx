import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AddQuestionModal({ isOpen, onClose, onQuestionAdded }) {
  const [questionData, setQuestionData] = useState({
    text: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onQuestionAdded(questionData);
      onClose();
      setQuestionData({ text: "" });
    } catch (error) {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-25"></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative z-10 shadow-xl">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">
          Add New Question
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text
            </label>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              rows={3}
              value={questionData.text}
              onChange={(e) =>
                setQuestionData({ ...questionData, text: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 cursor-pointer"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionModal;
