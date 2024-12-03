import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Import the Firestore instance
import TakeExam from "./TakeExam";

const AvailableExams = () => {
  const [exams, setExams] = useState([]); // List of exams
  const [selectedExam, setSelectedExam] = useState(null); // Currently selected exam
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch exams from Firebase
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "exams"));
        const examsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExams(examsList);
        setLoading(false);
      } catch (err) {
        setError("Failed to load exams. Please try again later.");
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Time remaining calculator
  const calculateTimeStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      const diff = start - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `Starts in ${hours}h ${minutes}m`;
    } else if (now >= start && now <= end) {
      const diff = end - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `Ends in ${hours}h ${minutes}m`;
    } else {
      return "Exam has ended.";
    }
  };

  // Periodically update the timer
  useEffect(() => {
    const interval = setInterval(() => {
      setExams((prevExams) =>
        prevExams.map((exam) => ({
          ...exam,
          timeStatus: calculateTimeStatus(exam.startTime, exam.endTime),
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // If an exam is selected, render TakeExam component
  if (selectedExam) {
    return <TakeExam examId={selectedExam.id} />;
  }

  return (
    <div className="container mt-4">
      <h3>Available Exams</h3>
      {loading && <p>Loading exams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && exams.length === 0 && <p>No exams available.</p>}
      {!loading && !error && exams.length > 0 && (
        <div className="list-group">
          {exams.map((exam) => (
            <div key={exam.id} className="list-group-item">
              <h5>{exam.courseName}</h5>
              <p>Start Time: {new Date(exam.startTime).toLocaleString()}</p>
              <p>End Time: {new Date(exam.endTime).toLocaleString()}</p>
              <p className="text-info">
                {calculateTimeStatus(exam.startTime, exam.endTime)}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSelectedExam(exam)}
              >
                Take Exam
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableExams;
