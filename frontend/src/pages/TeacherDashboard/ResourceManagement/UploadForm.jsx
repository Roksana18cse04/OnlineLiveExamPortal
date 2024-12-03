import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const UploadForm = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [year, setYear] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !courseCode || !questionType || !year) {
      return alert("Please fill in all fields and upload a file!");
    }

    const questionData = {
      id: Date.now(),
      fileName,
      file,
      courseCode,
      type: questionType,
      year,
    };

    onSubmit(questionData);

    // Reset form fields after submitting
    setFile(null);
    setFileName("");
    setCourseCode("");
    setQuestionType("");
    setYear("");
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseCode" className="form-label">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            className="form-control"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="questionType" className="form-label">
            Question Type
          </label>
          <select
            id="questionType"
            className="form-control"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Mid">Mid</option>
            <option value="Final">Final</option>
            <option value="MCQ">MCQ</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="text"
            id="year"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        {fileName && (
          <div className="mb-3">
            <label className="form-label">Uploaded File: </label>
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              {fileName}
            </a>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </React.Fragment>
  );
};

// PropTypes validation
UploadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Define that onSubmit is a required function prop
};

export default UploadForm;
