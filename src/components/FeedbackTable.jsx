import React, { useState } from "react";
import { Filter, QrCode, EyeOff, Plus } from "lucide-react";
import QrModal from "./QrModal";
import AddQuestionModal from "./AddQuestionModal";
import { FeedbackChart } from "./FeedbackTableChart";
import useFeedbackData from "../hooks/feedback/useFeedbackData";
import useCombinedFeedback from "../hooks/feedback/useCombinedFeedback";
import useFeedbackFilters from "../hooks/feedback/useFeedbackFilters";

// Color mapping for ratings
const ratingColors = {
  Excellent: "#00796B",
  Good: "#4CAF50",
  Normal: "#CFD8DC",
  "Needs improvement": "#AFB42B",
};

function FeedbackTable() {
  const [isQrModal, setIsQrModal] = useState(false);
  const [isAddQuestionModal, setIsAddQuestionModal] = useState(false);
  const { feedbacks, questionMap, createQuestion } = useFeedbackData();
  const {
    startDate,
    endDate,
    showFilters,
    setStartDate,
    setEndDate,
    setShowFilters,
    handleResetFilters,
  } = useFeedbackFilters();
  const { questions } = useCombinedFeedback(
    feedbacks,
    questionMap,
    startDate,
    endDate
  );

  const handleQuestionAdded = async (questionData) => {
    try {
      await createQuestion(questionData);
      setIsAddQuestionModal(false);
    } catch (error) {
    }
  };

  return (
    <>
      <div className="p-6 animate-fadeIn">
        {/* Filter Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-[100px] text-white bg-teal-700 px-3 py-2 border border-gray-400 rounded-lg gap-1 hover:bg-teal-800 cursor-pointer"
              aria-expanded={showFilters}
            >
              {showFilters ? <EyeOff size={20} /> : <Filter size={20} />}
              {showFilters ? "Hide" : "Filter"}
            </button>
            {showFilters && (
              <div className="flex flex-wrap gap-4 pt-3">
                <div>
                  <label className="block text-sm text-gray-600">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded p-2 text-sm"
                  />
                </div>
                <button
                  onClick={handleResetFilters}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 self-end text-sm"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsAddQuestionModal(true)}
              className="flex items-center text-white bg-teal-700 px-3 py-2 border border-gray-400 rounded-lg gap-1 hover:bg-teal-800 cursor-pointer"
            >
              <Plus size={20} />
              Add Question
            </button>
            <button
              onClick={() => setIsQrModal(true)}
              className="flex items-center text-white bg-teal-700 px-3 py-2 border border-gray-400 rounded-lg gap-1 hover:bg-teal-800 cursor-pointer"
            >
              <QrCode size={20} />
              Get QR
            </button>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed rounded-lg overflow-hidden border">
            <thead>
              <tr className="bg-teal-700 text-white text-center">
                <th className="w-5/12 px-4 py-2">Question</th>
                <th className="w-3/12 px-4 py-2">Chart</th>
                <th className="w-3/12 px-4 py-2">Results</th>
              </tr>
            </thead>
            <tbody>
              {/* No Data States */}
              {questions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-600">
                    No feedback questions available.
                  </td>
                </tr>
              ) : questions.every((q) => !q.hasData) ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-600">
                    No ratings match the selected filter.
                  </td>
                </tr>
              ) : (
                questions.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-10 py-3 text-sm break-words">{item.question}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center h-32 items-center">
                        {item.hasData ? (
                          <FeedbackChart data={item.data} questionId={item.id} />
                        ) : (
                          <span className="text-gray-500">No data</span>
                        )}
                      </div>
                    </td>
                    <td className="px-15 py-3 text-sm relative ">
                      {item.hasData ? (
                        <ul className="space-y-2">
                          {item.data.map((d) => (
                            <li
                              key={d.name}
                              className="flex gap-2 items-center relative "
                            >
                              <span
                                className="w-4 h-4 rounded-full inline-block"
                                style={{ backgroundColor: ratingColors[d.name] }}
                              />
                              <span>{`${d.value}% ${d.name} (${d.count})`}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">No ratings</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Modal */}
      <QrModal isOpen={isQrModal} onClose={() => setIsQrModal(false)} />

      {/* Add Question Modal */}
      <AddQuestionModal
        isOpen={isAddQuestionModal}
        onClose={() => setIsAddQuestionModal(false)}
        onQuestionAdded={handleQuestionAdded}
      />
    </>
  );
}

export default FeedbackTable;