import React, { useState } from "react";
import { storage, db } from "../../firebase"; // Firebase storage and Firestore
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const CreateQuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [pdfFile, setPdfFile] = useState(null); // PDF file state

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]); // Handle PDF file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

    // Upload PDF to Firebase Storage
    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        console.error("Error uploading file:", err);
        alert("Failed to upload PDF.");
      },
      async () => {
        // Get the download URL of the uploaded PDF
        const pdfUrl = await getDownloadURL(uploadTask.snapshot.ref);

        // Add question data to Firestore
        try {
          await addDoc(collection(db, "questions"), {
            text: questionText,
            options,
            correctAnswer,
            difficulty,
            pdfUrl, // Store the PDF URL
          });
          alert("Question added successfully!");
        } catch (err) {
          console.error("Error adding question:", err);
          alert("Failed to add question.");
        }
      }
    );
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="container mt-4">
      <h3>Create Question</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Text</label>
          <input
            type="text"
            className="form-control"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>

        <div className="form-group">
          <label>Correct Answer</label>
          <input
            type="text"
            className="form-control"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select
            className="form-control"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload PDF</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={handlePdfChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Add Question</button>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
