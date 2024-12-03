import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { auth } from "../../firebase"; // Ensure Firebase is properly configured
import "../../assets/style/TeacherProfilePage.css";

const TeacherProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  const database = getDatabase();

  useEffect(() => {
    if (user) {
      // Fetch teacher profile data from Firebase Realtime Database
      const profileRef = ref(database, `teachers/${user.uid}`);
      onValue(profileRef, (snapshot) => {
        if (snapshot.exists()) {
          setProfileData(snapshot.val());
          setUpdatedData(snapshot.val()); // Set default edit values
        }
        setLoading(false);
      });
    }
  }, [user, database]);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const profileRef = ref(database, `teachers/${user.uid}`);
      try {
        await update(profileRef, updatedData);
        setProfileData(updatedData); // Update displayed data
        alert("Profile updated successfully!");
        setEditing(false);
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Failed to update profile.");
      }
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Teacher Profile</h1>

      {!editing ? (
        <div>
          {profileData ? (
            <div>
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Department:</strong> {profileData.department}</p>
              <p><strong>Designation:</strong> {profileData.designation}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          ) : (
            <p>No profile data available.</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={updatedData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Department:</label><br />
            <input
              type="text"
              name="department"
              value={updatedData.department || ""}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Designation:</label><br />
            <input
              type="text"
              name="designation"
              value={updatedData.designation || ""}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default TeacherProfile;
