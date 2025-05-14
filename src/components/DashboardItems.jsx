import React, { useState } from "react";
import { Chart, HorizontalChart, FeedbackChart } from "./Chart";
import useFeedbackData from "../hooks/feedback/useFeedbackData";
import useTopAnnouncements from "../hooks/announcements/useTopAnnouncements";

function DashboardItems() {
  const { feedbacks, questionMap } = useFeedbackData();
  const { topAnnouncements } = useTopAnnouncements();
  const [selectedFeedbackDate, setSelectedFeedbackDate] = useState("");

  const totalFeedback = feedbacks.length;
  const totalUsersAnswered = [...new Set(feedbacks.map((feedback) => feedback.name))].length;

  const formatMonthYear = (dateString) => {
    if (!dateString) return "All";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <>
      <div className="mx-9 my-6 mb-6 space-y-6">
        <div className="flex gap-6 transition-all ease-in-out duration-700 animate-fadeIn">
          <section className="flex flex-col gap-6 w-1/2">
            {/* <div className="border-gray-500 shadow-md rounded-2xl h-44 flex flex-col justify-around">
              <h2 className="border-b border-gray-200 p-3 mx-3 text-center">Total Users Answered</h2>
              <h1 className="font-bold text-xl p-3 text-center">{totalUsersAnswered}</h1>
            </div> */}
            <div className="border-gray-500 shadow-md rounded-2xl h-44 flex flex-col justify-around">
              <h2 className="border-b border-gray-200 p-3 mx-3 text-center">Total Feedbacks</h2>
              <h1 className="font-bold text-xl text-center">{totalFeedback}</h1>
            </div>
          </section>

          <section>
            <div className="p-3 border-gray-500 shadow-md rounded-2xl h-full">
              <div className="flex justify-between items-center border-b border-gray-200 p-3">
                <h3>Feedback Activity</h3>
              </div>
              <Chart feedbacks={feedbacks} />
            </div>
          </section>
        </div>

        {/* Feedback and Horizontal Chart Sections */}
        <div className="flex gap-6 transition-all ease-in-out duration-700 animate-fadeIn">
          <section>
            <div className="border-gray-500 shadow-md rounded-2xl p-3 w-97 h-full">
              <div className="flex justify-between items-center border-b border-gray-200 p-3">
                <h3>Performance Breakdown</h3>
                <input
                  type="month"
                  value={selectedFeedbackDate}
                  onChange={(e) => setSelectedFeedbackDate(e.target.value)}
                  className="border border-gray-300 rounded p-2 text-sm"
                />
              </div>
              <FeedbackChart
                feedbacks={feedbacks}
                questionMap={questionMap}
                selectedMonth={formatMonthYear(selectedFeedbackDate)}
              />
            </div>
          </section>

          <section>
            <div className="border-gray-500 shadow-md rounded-2xl p-3 h-full">
              <HorizontalChart topAnnouncements={topAnnouncements} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default DashboardItems;