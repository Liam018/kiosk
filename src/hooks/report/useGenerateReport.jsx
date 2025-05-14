import { useMemo } from "react";

const useGenerateReport = () => {
  const ratingDisplayMap = {
    excellent: "Excellent",
    good: "Good",
    normal: "Normal",
    "needs improvement": "Needs Improvement",
  };

  const roleDisplayMap = {
    student: "Student",
    employee: "Employee",
    parent: "Parent/Guardian",
    visitor: "Visitor",
  };

  const filterFeedbackByMonth = (feedbacks, selectedDate) => {
    if (!selectedDate || !feedbacks) return [];

    const [year, month] = selectedDate.split("-");
    if (!year || !month) return [];

    return feedbacks.filter((f) => {
      const feedbackDate = new Date(f.created_at);
      return (
        feedbackDate.getFullYear() === parseInt(year) &&
        feedbackDate.getMonth() + 1 === parseInt(month)
      );
    });
  };

  const aggregateFeedbackData = (filteredFeedbacks, questionMap) => {
    if (!filteredFeedbacks?.length || !questionMap || !Object.keys(questionMap).length) {
      return [];
    }

    // Get all question IDs from questionMap
    const questionIds = Object.keys(questionMap).map(Number);
    const uniqueRoles = [
      ...new Set(filteredFeedbacks.map((f) => roleDisplayMap[f.role] || f.role)),
    ];

    return questionIds.map((qId) => {
      const ratingCounts = {
        excellent: 0,
        good: 0,
        normal: 0,
        "needs improvement": 0,
      };

      const roleBreakdowns = {
        excellent: {},
        good: {},
        normal: {},
        "needs improvement": {},
      };

      uniqueRoles.forEach((role) => {
        Object.keys(roleBreakdowns).forEach((rating) => {
          roleBreakdowns[rating][role] = 0;
        });
      });

      // Aggregate ratings and role breakdowns
      filteredFeedbacks.forEach((f) => {
        // Find response for this question
        const response = f.responses?.find((r) => r.question === qId);
        if (response && ratingCounts.hasOwnProperty(response.rating)) {
          const rating = response.rating;
          const role = roleDisplayMap[f.role] || f.role;
          ratingCounts[rating]++;
          roleBreakdowns[rating][role]++;
        }
      });

      const total = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

      const data = Object.keys(ratingCounts).map((rating) => ({
        name: ratingDisplayMap[rating],
        value: total ? Math.round((ratingCounts[rating] / total) * 100) : 0,
        count: ratingCounts[rating],
        breakdown: roleBreakdowns[rating],
      }));

      const hasData = total > 0;

      return {
        id: qId,
        question: questionMap[qId] || `Question ${qId}`,
        data,
        hasData,
      };
    });
  };

  return useMemo(
    () => ({
      filterFeedbackByMonth,
      aggregateFeedbackData,
    }),
    []
  );
};

export default useGenerateReport;