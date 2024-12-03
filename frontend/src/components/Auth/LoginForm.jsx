
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; // Ensure Firebase is configured
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = ({ role, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setIsPasswordValid(false);
      setLoading(false);
      return;
    }

    try {
      // Authenticate user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role !== role) {
          throw new Error("Role mismatch. Please select the correct role.");
        }

        // Navigate to the correct dashboard
        onLogin();
      } else {
        setError("User data not found. Please contact support.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(error.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${isEmailValid ? "" : "is-invalid"}`}
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsEmailValid(true);
          }}
          required
          placeholder="Enter your email"
        />
        {!isEmailValid && (
          <div className="invalid-feedback">Please enter a valid email address.</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${isPasswordValid ? "" : "is-invalid"}`}
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsPasswordValid(true);
          }}
          required
          placeholder="Enter your password"
        />
        {!isPasswordValid && (
          <div className="invalid-feedback">
            Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;