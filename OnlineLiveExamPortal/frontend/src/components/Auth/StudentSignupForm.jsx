import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push, set } from "firebase/database";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    studentName: "",
    studentId: "",
    session: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const userData = {
      email: formData.email,
      name: formData.studentName,
      studentId: formData.studentId,
      session: formData.session,
      department: formData.department,
    };
  
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
  
      // Save user data to Firebase Realtime Database
      try {
        await set(ref(database, `students/${user.uid}`), userData);
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error saving data: ", error.code, error.message);
        setError("Error saving additional data. Please try again.");
        return; // Exit the function if saving data fails
      }
  
      // Navigate to dashboard or success page
      navigate("/student-dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please log in or use a different email.");
      } else {
        setError("Signup failed. Please try again.");
      }
      console.error("Signup Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Signup</h2>
      <input name="studentName" placeholder="Name" onChange={handleChange} required /><br /><br />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br /><br />
      <input name="studentId" placeholder="Student ID" onChange={handleChange} required /><br /><br />
      <input name="session" placeholder="Session" onChange={handleChange} required /><br /><br />
      <input name="department" placeholder="Department" onChange={handleChange} required /><br /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br /><br />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      /> <br /><br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>Signup</button>
    </form>
  );
};

export default SignupForm;
