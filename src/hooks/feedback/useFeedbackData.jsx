import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useFeedbackData = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [questionMap, setQuestionMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackRes = await axios.get("http://127.0.0.1:8000/users/feedback/list/");
        const questionRes = await axios.get("http://127.0.0.1:8000/users/question/list/");
        const qMap = questionRes.data.reduce((map, q) => {
          map[q.id] = q.text;
          return map;
        }, {});
        setFeedbacks(feedbackRes.data);
        setQuestionMap(qMap);
      } catch (error) {
        toast.error("Failed to load feedback data.");
        setFeedbacks([]);
        setQuestionMap({});
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const createQuestion = async (questionData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/question/create/", questionData);
      setQuestionMap((prev) => ({
        ...prev,
        [response.data.id]: response.data.text,
      }));
      toast.success("Question added successfully!");
    } catch (error) {
      toast.error("Failed to add question.");
      throw error;
    }
  };

  return { feedbacks, questionMap, createQuestion };
};

export default useFeedbackData;