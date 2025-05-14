import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackFormStart from "./FeedbackForms/FeedbackFormStart";
import FeedbackFormFirst from "./FeedbackForms/FeedbackFormFirst";
import FeedbackFormSubmit from "./FeedbackForms/FeedbackFormSubmit";
import ThankYouForm from "./FeedbackForms/ThankYouForm";
import { toast } from "react-toastify";

function FeedbackForm() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ name: "", role: "" });
  const [ratingsData, setRatingsData] = useState({});
  const [questions, setQuestions] = useState([]);

  const validRoles = ["student", "employee", "parent", "visitor"];
  const validRatings = ["excellent", "good", "normal", "needs improvement"];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/users/question/list/"
        );
        setQuestions(response.data);
        setRatingsData(
          response.data.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {})
        );
      } catch (error) {
        toast.error("Failed to load questions. Please try again.");
      }
    };
    fetchQuestions();
  }, []);

  const handleFirstFormNext = (data) => {
    setUserData(data);
    setStep(2);
  };

  const handleSubmit = async (finalRatings) => {
    const normalizedRole = userData.role
      .toLowerCase()
      .replace(/\/guardian/, "")
      .trim();
    if (!validRoles.includes(normalizedRole)) {
      toast.error("Invalid role selected. Please choose a valid role.");
      return;
    }

    try {
      const responses = questions.map((q) => {
        const rating = finalRatings[q.id]?.toLowerCase().trim();
        if (!rating || !validRatings.includes(rating)) {
          throw new Error(`Please provide a valid rating for "${q.text}"`);
        }
        return {
          question: q.id,
          rating,
        };
      });

      const questionIds = responses.map((r) => r.question);
      if (questionIds.length !== new Set(questionIds).size) {
        throw new Error("Duplicate question IDs detected in responses.");
      }

      const finalData = {
        name: userData.name.trim(),
        role: normalizedRole,
        responses,
      };

      if (!finalData.name) {
        toast.error("Please provide a name.");
        return;
      }

      console.log("Submitting payload:", JSON.stringify(finalData, null, 2));
      await axios.post(
        "http://127.0.0.1:8000/users/feedback/create/",
        finalData
      );
      setStep(3); 
    } catch (error) {
      const errorMessage =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.responses?.[0] ||
        error.response?.data?.detail ||
        error.message ||
        "Failed to submit feedback. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleRestart = () => {
    setStep(0);
    setUserData({ name: "", role: "" });
    setRatingsData(questions.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {}));
  };

  return (
    <>
      {step === 0 && <FeedbackFormStart onStart={() => setStep(1)} />}
      {step === 1 && (
        <FeedbackFormFirst
          onNext={handleFirstFormNext}
          initialData={userData}
        />
      )}
      {step === 2 && (
        <FeedbackFormSubmit
          userInfo={userData}
          initialRatings={ratingsData}
          onBack={handleBack}
          onSubmit={handleSubmit}
          questions={questions}
        />
      )}
      {step === 3 && <ThankYouForm onRestart={handleRestart} />}
    </>
  );
}

export default FeedbackForm;
