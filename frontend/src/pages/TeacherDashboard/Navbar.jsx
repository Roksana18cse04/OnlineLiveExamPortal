import React from "react";
import { Link } from "react-router-dom";

const TeacherNavbar = () => {
  return (
    <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/teacher-dashboard">
          Teacher Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/make-question">
                Make Question
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="resourceDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resource Management
              </Link>
              <ul className="dropdown-menu" aria-labelledby="resourceDropdown">
                <li>
                  <Link className="dropdown-item" to="/resource/question-pdf">
                    Question PDF
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/resource/book-pdf">
                  BookGallery
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exam-routine">
                Exam Routine
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/result">
                Result
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile-update">
                Profile Update
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </React.Fragment>
  );
};

export default TeacherNavbar;
