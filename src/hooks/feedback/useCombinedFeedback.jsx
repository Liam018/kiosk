import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useCombinedFeedback = (feedbacks, questionMap, startDate, endDate) => {
  const [questions, setQuestions] = useState([]);

  const ratingDisplayMap = {
    excellent: "Excellent",
    good: "Good",
    normal: "Normal",
    "needs improvement": "Needs improvement",
  };

  const roleDisplayMap = {
    student: "Student",
    employee: "Employee",
    parent: "Parent/Guardian",
    visitor: "Visitor",
  };

  useEffect(() => {
    generateCombinedData(feedbacks, questionMap, startDate, endDate);
  }, [feedbacks, questionMap, startDate, endDate]);

  const generateCombinedData = (allFeedbacks, qMap, start, end) => {
    if (start && end && new Date(start) > new Date(end)) {
      toast.error("End date cannot be before start date.");
      return;
    }

    const filtered = allFeedbacks.filter((f) => {
      const feedbackDate = f.created_at.split("T")[0];
      const afterStart = !start || feedbackDate >= start;
      const beforeEnd = !end || feedbackDate <= end;
      return afterStart && beforeEnd;
    });

    const fields = Object.keys(qMap).map((questionId) => ({
      key: questionId,
      questionIdField: questionId,
    }));

    if (fields.length === 0) {
      setQuestions([]);
      return;
    }

    const uniqueRoles = [
      ...new Set(filtered.map((f) => roleDisplayMap[f.role] || f.role)),
    ];

    const combined = fields.map((field, i) => {
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

      filtered.forEach((f) => {
        f.responses.forEach((r) => {
          if (r.question === parseInt(field.questionIdField)) {
            const rating = r.rating;
            const role = roleDisplayMap[f.role] || f.role;
            if (ratingCounts.hasOwnProperty(rating)) {
              ratingCounts[rating]++;
              roleBreakdowns[rating][role]++;
            }
          }
        });
      });

      const total = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

      const data = Object.keys(ratingCounts).map((rating) => ({
        name: ratingDisplayMap[rating],
        value: total ? Math.round((ratingCounts[rating] / total) * 100) : 0,
        count: ratingCounts[rating],
        breakdown: roleBreakdowns[rating],
      }));

      const hasData = Object.values(ratingCounts).some((count) => count > 0);

      return {
        id: i + 1,
        question: qMap[field.questionIdField] || `Question ${field.questionIdField}`,
        data,
        hasData,
      };
    });

    setQuestions(combined);
  };

  return { questions };
};

export default useCombinedFeedback;