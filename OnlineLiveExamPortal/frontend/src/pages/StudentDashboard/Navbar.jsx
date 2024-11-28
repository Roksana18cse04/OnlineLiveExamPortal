// src/components/StudentDashboard/Navbar.jsx
import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ setActiveComponent }) => {
  return (
    <React.Fragment>
    <div className="navbar bg-light p-3" style={{ display: "flex", gap: "10px" }}>
      <button
        className="btn btn-primary"
        onClick={() => setActiveComponent("ExamRoutine")}
      >
        Exam Routine
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => setActiveComponent("PreviousExamsQuestions")}
      >
        Previous Exams
      </button>
      <button
        className="btn btn-success"
        onClick={() => setActiveComponent("ResultAnalysis")}
      >
        Result Analysis
      </button>
      <button
        className="btn btn-warning"
        onClick={() => setActiveComponent("ProfileUpdate")}
      >
        Profile Update
      </button>
    </div>
    </React.Fragment>
  );
};

// PropTypes for validation
Navbar.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};

export default Navbar;
