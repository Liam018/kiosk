import React, { useState } from "react";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Filter } from "lucide-react";
import useCombinedFeedback from "../hooks/feedback/useCombinedFeedback";

export function Chart({ feedbacks }) {
  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  // Get unique years from feedback data
  const years = [
    ...new Set(
      feedbacks.map((feedback) => new Date(feedback.created_at).getFullYear())
    ),
  ].sort();

  // Define all months
  const monthsList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Aggregate feedback counts by month-year
  const feedbackByMonth = feedbacks.reduce((acc, feedback) => {
    const monthYear = getMonthYear(feedback.created_at);
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for BarChart: all months for each year
  const months = years
    .flatMap((year) =>
      monthsList.map((month, index) => {
        const monthYear = `${month} ${year}`;
        return {
          name:
            years.length > 1
              ? `${month} ${year.toString().slice(-2)}`
              : month.toUpperCase(), // e.g., "JAN 25" or "JAN"
          fullMonthYear: monthYear,
          activity: feedbackByMonth[monthYear] || 0,
        };
      })
    )
    .sort((a, b) => {
      const [monthA, yearA] = a.fullMonthYear.split(" ");
      const [monthB, yearB] = b.fullMonthYear.split(" ");
      return (
        new Date(`${yearA}-${monthsList.indexOf(monthA) + 1}-01`) -
        new Date(`${yearB}-${monthsList.indexOf(monthB) + 1}-01`)
      );
    });

  const maxActivity = Math.max(...months.map((m) => m.activity), 10);

  return (
    <div>
      <BarChart
        width={750}
        height={300}
        data={months}
        layout="horizontal"
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4DB6AC" stopOpacity={1} />
            <stop offset="100%" stopColor="#26A69A" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10 }}
          interval={0}
          angle={years.length > 1 ? -45 : 0}
          textAnchor={years.length > 1 ? "end" : "middle"}
        />
        <YAxis
          domain={[0, Math.ceil(maxActivity / 10) * 20]}
          tickCount={5}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Bar
          dataKey="activity"
          fill="url(#barGradient)"
          radius={[5, 5, 0, 0]}
          barSize={20}
        />
      </BarChart>
    </div>
  );
}

export function FeedbackChart({ feedbacks, questionMap, selectedMonth }) {
  // Use useCombinedFeedback with month filtering
  const startDate =
    selectedMonth && selectedMonth !== "All" ? new Date(selectedMonth) : null;
  const endDate = startDate
    ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
    : null;
  const { questions } = useCombinedFeedback(
    feedbacks,
    questionMap,
    startDate ? startDate.toISOString().split("T")[0] : null,
    endDate ? endDate.toISOString().split("T")[0] : null
  );

  const allRatings = ["Excellent", "Good", "Normal", "Needs improvement"];
  const ratingCounts = {
    Excellent: 0,
    Good: 0,
    Normal: 0,
    "Needs improvement": 0,
  };

  // Combine counts across all questions
  questions.forEach((question) => {
    question.data.forEach((entry) => {
      if (ratingCounts.hasOwnProperty(entry.name)) {
        ratingCounts[entry.name] += entry.count;
      }
    });
  });

  // Prepare data for PieChart, including all ratings
  const data = allRatings.map((name) => ({
    name,
    value: ratingCounts[name],
  }));

  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  const COLORS = [
    "url(#gradientExcellent)",
    "url(#gradientGood)",
    "url(#gradientNormal)",
    "url(#gradientNeedsImprovement)",
  ];

  const formatLegend = (value, entry) => {
    const percentage = totalValue
      ? ((entry.payload.value / totalValue) * 100).toFixed(0)
      : 0;
    return `${value} (${percentage}%)`;
  };

  return (
    <div>
      {totalValue > 0 ? (
        <PieChart width={370} height={300}>
          <defs>
            <linearGradient id="gradientExcellent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#26A69A" stopOpacity={1} />
              <stop offset="100%" stopColor="#00796B" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradientGood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity={1} />
              <stop offset="100%" stopColor="#388E3C" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradientNormal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#CFD8DC" stopOpacity={1} />
              <stop offset="100%" stopColor="#CFD8DC" stopOpacity={1} />
            </linearGradient>
            <linearGradient
              id="gradientNeedsImprovement"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#AFB42B" stopOpacity={1} />
              <stop offset="100%" stopColor="#AFB42B" stopOpacity={1} />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            formatter={formatLegend}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
          <p className="text-center text-lg font-semibold">
            No feedback data available for {selectedMonth}
          </p>
          <p className="text-center text-sm mt-2">
            Please select a different month or check back later.
          </p>
        </div>
      )}
    </div>
  );
}

export function HorizontalChart({ topAnnouncements }) {
  const [selectedMonth, setSelectedMonth] = useState("");

  // Prepare data for the chart
  const data =
    topAnnouncements?.map((announcement) => ({
      name:
        announcement.announcement_title.length > 20
          ? `${announcement.announcement_title.substring(0, 17)}...`
          : announcement.announcement_title,
      views: announcement.views || 0,
    })) || [];

  // Calculate max views for X-axis domain, 100 for visibility
  const maxViews = Math.max(...data.map((item) => item.views), 100);

  return (
    <div>
      <div className="flex justify-between items-center border-b border-gray-200 p-3">
        <h3>Most Viewed Active Announcements</h3>
      </div>

      {data.length > 0 ? (
        <BarChart
          width={750}
          height={300}
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#26A69A" stopOpacity={1} />
              <stop offset="100%" stopColor="#4DB6AC" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            type="number"
            domain={[0, Math.ceil(maxViews / 50) * 50]} 
            tickCount={5}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12 }}
            width={150} 
          />
          <Tooltip />
          <Bar
            dataKey="views"
            fill="url(#barGradient)"
            radius={[0, 5, 5, 0]}
            barSize={20}
            
          />
        </BarChart>
      ) : (
        <p className="p-3 text-gray-500">No announcements available.</p>
      )}
    </div>
  );
}
