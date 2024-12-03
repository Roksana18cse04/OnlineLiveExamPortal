import React, { useState, useEffect } from "react";
import "../../assets/style/makequestion.css";
const ExamRoutine = () => {
  const [examList, setExamList] = useState([]); // State for exam routines
  const [examDetails, setExamDetails] = useState({
    name: "",
    date: "",
    startTime: "",
    department: "",
    session: "",
    durationHours: "",
    durationMinutes: "",
    durationSeconds: "",
  });
  const [currentTime, setCurrentTime] = useState(new Date()); // Live current time
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const departments = ["CSE", "EEE", "BBA", "Civil"]; // Example departments
  const sessions = ["2018-2019", "2019-2020",]; // Example sessions

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({ ...examDetails, [name]: value });
  };

  // Add a new exam
  const handleAddExam = (e) => {
    e.preventDefault();

    const {
      name,
      date,
      startTime,
      department,
      session,
      durationHours,
      durationMinutes,
      durationSeconds,
    } = examDetails;

    // Validation before adding exam
    if (!name || !date || !startTime || !department || !session || !durationHours || !durationMinutes || !durationSeconds) {
      alert("Please fill in all the required fields.");
      return; // Prevent form submission if any required field is missing
    }

    // Convert start time and duration to milliseconds
    const startDateTime = new Date(`${date}T${startTime}`);
    const durationInMilliseconds =
      (parseInt(durationHours) || 0) * 3600000 + // Hours to ms
      (parseInt(durationMinutes) || 0) * 60000 + // Minutes to ms
      (parseInt(durationSeconds) || 0) * 1000;   // Seconds to ms

    const endDateTime = new Date(startDateTime.getTime() + durationInMilliseconds);

    // Create the exam object
    const newExam = {
      id: Date.now(),
      name,
      department,
      session,
      startTime: startDateTime,
      endTime: endDateTime,
    };

    // Add the new exam to the list
    setExamList([...examList, newExam]);
    setExamDetails({
      name: "",
      date: "",
      startTime: "",
      department: "",
      session: "",
      durationHours: "",
      durationMinutes: "",
      durationSeconds: "",
    });

    setShowForm(false); // Hide the form after adding exam
  };

  // Determine the exam status and the time display
  const getExamStatus = (startTime, endTime) => {
    const now = currentTime;

    if (now < startTime) {
      return "Upcoming";
    } else if (now >= startTime && now <= endTime) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };

  // Calculate time remaining for upcoming exams or ongoing exams
  const getTimeRemaining = (startTime, endTime) => {
    const now = currentTime;
    const status = getExamStatus(startTime, endTime);

    if (status === "Upcoming") {
      const timeDiff = startTime - now;

      if (timeDiff <= 0) {
        return "Starts now!";
      }

      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return `${hours}h ${minutes}m ${seconds}s remaining`;
    } else if (status === "Ongoing") {
      const timeDiff = endTime - now;

      if (timeDiff <= 0) {
        return "Ongoing exam ended!";
      }

      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return `Ends in ${hours}h ${minutes}m ${seconds}s`;
    }

    return ""; // For completed exams, no time remaining
  };

  return (
    <React.Fragment>
    <div className="container mt-4">
      <h1>Exam Routine</h1>

      {/* Live Time */}
      <div className="alert alert-info text-center">
        Current Time: {currentTime.toLocaleString()}
      </div>

      {/* Upcoming Exam List */}
      <h2>Upcoming Exam List</h2>
      {examList.length > 0 ? (
        <ul className="list-group">
          {examList.map((exam) => {
            const status = getExamStatus(exam.startTime, exam.endTime);
            const timeRemaining = getTimeRemaining(exam.startTime, exam.endTime);

            return (
              <li
                key={exam.id}
                className="list-group-item d-flex justify-content-center align-items-center text-center"
              >
                <div>
                  <h5>{exam.name}</h5>
                  <p>
                    Department: {exam.department}, Session: {exam.session}
                    <br />
                    Start: {exam.startTime.toLocaleString()}
                    <br />
                    End: {exam.endTime.toLocaleString()}
                    <br />
                    <strong>Status: {status}</strong>
                    {timeRemaining && <div className="text-primary mt-2">{timeRemaining}</div>}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No exams scheduled.</p>
      )}

      {/* Button to Show/Hide Exam Routine Form */}
      <button
        className="btn btn-primary mt-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Exam Form" : "Add Exam"}
      </button>

      {/* Exam Routine Form */}
      {showForm && (
        <form onSubmit={handleAddExam} className="mt-4">
          <h3>Add New Exam</h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Exam Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={examDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={examDetails.date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="startTime" className="form-label">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              className="form-control"
              value={examDetails.startTime}
              onChange={handleChange}
            />
          </div>
          
          {/* Department Name */}
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department"
              name="department"
              className="form-control"
              value={examDetails.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Session */}
          <div className="mb-3">
            <label htmlFor="session" className="form-label">Session</label>
            <select
              id="session"
              name="session"
              className="form-control"
              value={examDetails.session}
              onChange={handleChange}
            >
              <option value="">Select Session</option>
              {sessions.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration (hours, minutes, seconds)</label>
            <div className="d-flex">
              <div className="col">
                <input
                  type="number"
                  id="durationHours"
                  name="durationHours"
                  className="form-control"
                  placeholder="Hours"
                  value={examDetails.durationHours}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  id="durationMinutes"
                  name="durationMinutes"
                  className="form-control"
                  placeholder="Minutes"
                  value={examDetails.durationMinutes}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  id="durationSeconds"
                  name="durationSeconds"
                  className="form-control"
                  placeholder="Seconds"
                  value={examDetails.durationSeconds}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Add Exam
          </button>
        </form>
      )}
    </div>
    </React.Fragment>
  );
};

export default ExamRoutine;
