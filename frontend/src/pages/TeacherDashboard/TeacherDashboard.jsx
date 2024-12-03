import React, { useState } from "react";
import CreateExam from "./CreateExam";
import QuestionPdf from "./ResourceManagement/QuestionPdf";
import BookGallery from "./ResourceManagement/BookGallery";
import ExamRoutine from "./ExamRoutine";
import Result from "./ResultDetail";
import TeacherProfile from "./TeacherProfile";
import "./TeacherDashboard.css";
import ExamForm from "./ExamForm";

const components = {
  CreateExam,
  ExamForm,
  QuestionPdf,
  BookGallery,
  ExamRoutine,
  Result,
  TeacherProfile,
};

const TeacherDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("TeacherProfile");

  const renderComponent = () => {
    const ActiveComponent = components[activeComponent];
    return <ActiveComponent />;
  };

  return (
    <React.Fragment>
      <h2>Teacher Dashboard</h2>
      <br />
      <br />
      <div>
        <header className="navbar bg-light p-3">
          <nav>
            {Object.keys(components).map((component) => (
              <button
                key={component}
                onClick={() => setActiveComponent(component)}
              >
                {component.replace(/([A-Z])/g, " $1").trim()}
              </button>
            ))}
          </nav>
        </header>
        <main className="p-4">{renderComponent()}</main>
      </div>
    </React.Fragment>
  );
};

export default TeacherDashboard;