import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../firebase"; // Ensure Firebase is properly configured

const TeacherSignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save teacher's data to the Realtime Database
      const db = getDatabase();
      await set(ref(db, "teachers/" + user.uid), {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        designation: formData.designation,
      });

      // Redirect to teacher dashboard
      navigate("/teacher-dashboard");
    } catch (error) {
      setError("Error signing up: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="teacher-signup-form">
      <h2 className="text-center">Teacher Signup</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Name</label><br />
        <input type="text" name="name" onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label><br />
        <input type="email" name="email" onChange={handleChange} required />
      </div>
      <div>
        <label>Department</label><br />
        <input type="text" name="department" onChange={handleChange} required />
      </div>
      <div>
        <label>Designation</label><br />
        <input type="text" name="designation" onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label><br />
        <input type="password" name="password" onChange={handleChange} required />
      </div>
      <div>
        <label>Confirm Password</label><br />
        <input type="password" name="confirmPassword" onChange={handleChange} required />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default TeacherSignupForm;
