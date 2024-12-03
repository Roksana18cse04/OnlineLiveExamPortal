import React, { useState } from "react";
import ExamRoutine from "./ExamRoutine";
import PreviousExamsQuestions from "./PreviousExamsQuestions";
import Profile from "./Profile";
import ResultAnalysis from "./ResultAnalysis";
import AvailableExams from './AvailableExams';

const StudentDashBoard = () => {
  const [activeComponent, setActiveComponent] = useState("ExamRoutine");

  const renderComponent = () => {
    switch (activeComponent) {
      case "ExamRoutine":
        return <ExamRoutine />;
      case "AvailableExams":
        return <AvailableExams />;
      case "PreviousExamsQuestions":
        return <PreviousExamsQuestions />;
      case "Profile":
        return <Profile />;
      case "ResultAnalysis":
        return <ResultAnalysis />;
      default:
        return <ExamRoutine />;
    }
  };

  return (
    <React.Fragment>
      <h2>Student Dashboard</h2><br /><br />
      <div>
        <header className="navbar bg-light p-3">
          <nav>
            <button onClick={() => setActiveComponent("ExamRoutine")}>Exam Routine</button>
            <button onClick={() => setActiveComponent("AvailableExams")}>Available Exams</button>
            <button onClick={() => setActiveComponent("PreviousExamsQuestions")}>Previous Exams</button>
            <button onClick={() => setActiveComponent("ResultAnalysis")}>Result Analysis</button>
            <button onClick={() => setActiveComponent("Profile")}>Profile</button>
          </nav>
        </header>
        <main className="p-4">{renderComponent()}</main>
      </div>
    </React.Fragment>
  );
};

export default StudentDashBoard;
