import React,{useState} from "react";
import ExamRoutine from "./ExamRoutine";
import PreviousExamsQuestions from "./PreviousExamsQuestions";
import Profile from "./Profile";
import ResultAnalysis from "./ResultAnalysis";

const StudentDashBoard = () => {
  const [activeComponent, setActiveComponent] = useState("ExamRoutine");

  const renderComponent = () => {
    switch (activeComponent) {
      case "ExamRoutine":
        return <ExamRoutine />;
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
          <button onClick={() => setActiveComponent("ExamRoutine")}>ExamRoutine</button>
          <button onClick={() => setActiveComponent("PreviousExamsQuestions")}>PreviousExamsQuestions</button>
          <button onClick={() => setActiveComponent("ResultAnalysis")}>ResultAnalysis</button>
          <button onClick={() => setActiveComponent("Profile")}>Profile</button>
        </nav>
      </header>
      <main className="p-4">{renderComponent()}</main>
    </div>
    </React.Fragment>
  );
};

export default StudentDashBoard;