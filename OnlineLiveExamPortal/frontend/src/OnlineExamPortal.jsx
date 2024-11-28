import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSignupForm from "./components/Auth/TeacherSignupForm";
import StudentSignupForm from "./components/Auth/StudentSignupForm";
import LoginForm from "./components/Auth/LoginForm";
import "./assets/style/App.css";

const OnlineExamPortal = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [role, setRole] = useState("Teacher"); // Default role
  const navigate = useNavigate();

  const handleRoleChange = (e) => setRole(e.target.value);
  const toggleForm = () => setIsLogin(!isLogin);

  // Redirects to respective dashboard after login
  const handleLogin = () => {
    if (role === "Teacher") {
      navigate("/teacher-dashboard");
    } else if (role === "Student") {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <div className="header-container d-flex align-items-center justify-content-center mb-4">
        <img
          src="../public/assets/images/bsmrstuLogo.jpg"
          alt="University Logo"
          className="university-logo"
        />
        <h1 className="text-center ms-3">
          Bangabandhu Sheikh Mujibur Rahman Science and Technology University,
          Gopalganj
        </h1>
      </div>

      <h1 className="text-center mb-4">Online Exam Portal</h1>

      <div className="text-center">
        <p className="fw-bold">Select your role:</p>
        <select
          className="form-select w-50 mx-auto"
          onChange={handleRoleChange}
          value={role}
        >
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
      </div>

      <div className="mt-4">
        {role === "Teacher" && (
          <div
            className="card p-4 shadow mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <h2 className="text-center">
              {isLogin ? "Teacher Login" : "Teacher Signup"}
            </h2>
            <button className="btn btn-link text-center" onClick={toggleForm}>
              {isLogin
                ? "Don't have an account? Signup"
                : "Already have an account? Login"}
            </button>
            {isLogin ? (
              <LoginForm role="Teacher" onLogin={handleLogin} />
            ) : (
              <TeacherSignupForm />
            )}
          </div>
        )}

        {role === "Student" && (
          <div
            className="card p-4 shadow mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <h2 className="text-center">
              {isLogin ? "Student Login" : "Student Signup"}
            </h2>
            <button className="btn btn-link text-center" onClick={toggleForm}>
              {isLogin
                ? "Don't have an account? Signup"
                : "Already have an account? Login"}
            </button>
            {isLogin ? (
              <LoginForm role="Student" onLogin={handleLogin} />
            ) : (
              <StudentSignupForm />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineExamPortal;
