import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // Import the Firestore instance

const TakeExam = ({ examId }) => {
  const [questions, setQuestions] = useState([]); // List of questions
  const [answers, setAnswers] = useState({}); // Store student answers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [submitted, setSubmitted] = useState(false); // Exam submission state
  const [score, setScore] = useState(0); // Store the score

  // Fetch questions for the selected exam from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const q = query(
          collection(db, "questions"),
          where("examId", "==", examId)
        );
        const querySnapshot = await getDocs(q);
        const questionsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsList);
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

  // Function to handle answer change
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  // Function to handle exam submission
  const handleSubmit = () => {
    let totalScore = 0;

    // Loop through all questions and check if the answer is correct
    questions.forEach((question) => {
      const correctAnswer = question.correctAnswer; // Assuming 'correctAnswer' field in Firestore
      const studentAnswer = answers[question.id];

      if (studentAnswer === correctAnswer) {
        totalScore++;
      }
    });

    setScore(totalScore);
    setSubmitted(true);
  };

  if (submitted) {
    // Display score after submission
    return (
      <div className="container mt-4">
        <h3>Exam Completed!</h3>
        <p>Your score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Exam Questions</h3>
      {loading && <p>Loading questions...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && questions.length === 0 && (
        <p>No questions available for this exam.</p>
      )}
      {!loading && !error && questions.length > 0 && (
        <div>
          <ul className="list-group">
            {questions.map((q, index) => (
              <li key={q.id} className="list-group-item">
                <p>
                  <strong>Q{index + 1}: </strong>{q.text}
                </p>
                <div>
                  {q.options.map((option, i) => (
                    <div key={i} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={() => handleAnswerChange(q.id, option)}
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-success mt-3" onClick={handleSubmit}>
            Submit Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default TakeExam;
