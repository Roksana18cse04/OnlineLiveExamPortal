import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore instance

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exam questions from Firestore
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

  return (
    <div className="container mt-4">
      <h3>Exam List</h3>
      {loading && <p>Loading exams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && exams.length === 0 && <p>No exams available.</p>}
      {!loading && !error && exams.length > 0 && (
        <div className="list-group">
          {exams.map((exam) => (
            <div key={exam.id} className="list-group-item">
              <h5>{exam.courseName}</h5>
              <p>Start Time: {new Date(exam.startTime).toLocaleString()}</p>
              {exam.pdfUrl && (
                <a href={exam.pdfUrl} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamList;
