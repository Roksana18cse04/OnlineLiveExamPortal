import React, { useState } from "react";
import UploadForm from "./UploadForm";

const QuestionPDFs = () => {
  const [courses, setCourses] = useState([]); // Stores all courses
  const [newCourseName, setNewCourseName] = useState(""); // For adding courses
  const [searchQuery, setSearchQuery] = useState(""); // For filtering courses

  // Add a new course
  const handleAddCourse = () => {
    if (!newCourseName) return alert("Course Name is required!");
    if (courses.some((course) => course.name === newCourseName)) {
      return alert("Course already exists!");
    }
    setCourses([...courses, { name: newCourseName, questions: [] }]);
    setNewCourseName("");
  };

  // Delete a course
  const handleDeleteCourse = (courseName) => {
    setCourses(courses.filter((course) => course.name !== courseName));
  };

  // Add a question to a course
  const handleUploadQuestion = (courseName, questionData) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.name === courseName
          ? { ...course, questions: [...course.questions, questionData] }
          : course
      )
    );
  };

  // Delete a question from a course
  const handleDeleteQuestion = (courseName, questionId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.name === courseName
          ? {
              ...course,
              questions: course.questions.filter(
                (question) => question.id !== questionId
              ),
            }
          : course
      )
    );
  };

  // Filtered courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <React.Fragment>
      <div className="container mt-4">
        {/* Navbar */}
        <div className="navbar d-flex justify-content-between align-items-center mb-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <br />
          <br />
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addCourseModal"
          >
            Add Course
          </button>

          {/* Add Course Modal */}
          <div className="modal" id="addCourseModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Course</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    placeholder="Enter course name"
                    className="form-control"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddCourse}
                    data-bs-dismiss="modal"  // Automatically closes the modal
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Sections */}
        {filteredCourses.map((course) => (
          <div className="course-section mb-5" key={course.name}>
            <div className="d-flex justify-content-between align-items-center">
              <h3>{course.name}</h3>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCourse(course.name)}
              >
                Delete Course
              </button>
            </div>
            <hr />

            {/* Question Sections */}
            {["Mid", "Final", "MCQ"].map((type) => (
              <div key={type} className="mb-3">
                <h5>{type} Questions</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Course Code</th>
                      <th>Type</th>
                      <th>Year</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.questions
                      .filter((q) => q.type === type)
                      .map((question) => (
                        <tr key={question.id}>
                          <td>
                            <a
                              href={URL.createObjectURL(question.file)} // Open PDF file
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary"
                            >
                              {question.fileName}
                            </a>
                          </td>
                          <td>{question.courseCode}</td>
                          <td>{question.type}</td>
                          <td>{question.year}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                handleDeleteQuestion(course.name, question.id)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* Upload Button */}
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadModal"
                >
                  Upload Question
                </button>

                {/* Upload Modal */}
                <div className="modal" id="uploadModal" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Upload Question</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {/* Upload Form */}
                        <UploadForm
                          onSubmit={(questionData) =>
                            handleUploadQuestion(course.name, questionData)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default QuestionPDFs;
