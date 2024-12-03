import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OnlineExamPortal from "./OnlineExamPortal";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import StudentDashBoard from "./pages/StudentDashboard/StudentDashBoard";
import AvailableExams from "./pages/StudentDashboard/AvailableExams";

import "./assets/style/App.css"

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<OnlineExamPortal />} exact />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashBoard />} />
          
        </Routes>
      </Router>
    </React.Fragment>
  );
};
export default App;