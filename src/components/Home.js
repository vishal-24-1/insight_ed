import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({ setInsights }) => {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerSheet, setAnswerSheet] = useState(null);
  const [answerKey, setAnswerKey] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Tracks upload progress
  const [uploadedFiles, setUploadedFiles] = useState([]); // Tracks uploaded file names
  const navigate = useNavigate();

  const handleFileUpload = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
    setUploadedFiles((prev) => [...prev, file.name]); // Add file name to uploaded list
  };

  const handleSubmit = async () => {
    if (!questionPaper || !answerSheet || !answerKey) {
      alert("Please upload all required files.");
      return;
    }

    const formData = new FormData();
    formData.append("questionPaper", questionPaper);
    formData.append("answerSheet", answerSheet);
    formData.append("answerKey", answerKey);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress); // Update progress
        },
      });

      // Reset progress and navigate to result page
      setUploadProgress(0);
      setInsights(response.data.insights);
      navigate("/result");
    } catch (error) {
      console.error("Error submitting data:", error);
      console.log("Server Response:", error.response);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
      setUploadProgress(0); // Reset progress on error
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", background: "linear-gradient(135deg, #f3f4f6, #e9eef5)", minHeight: "100vh" }}>
      {/* Header Section */}
      <header style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
        <h1 style={{ margin: 0, fontSize: "24px", color: "#4A4A4A" }}>Analyze Your Results with InsightEd AI</h1>
      </header>

      {/* File Upload Container */}
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "70px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        {/* Upload Progress Bar */}
        {uploadProgress > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <p>Upload Progress: {uploadProgress}%</p>
            <div style={{ width: "100%", height: "10px", backgroundColor: "#e0e0e0", borderRadius: "5px" }}>
              <div
                style={{
                  width: `${uploadProgress}%`,
                  height: "100%",
                  backgroundColor: "#4A90E2",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </div>
        )}

        {/* File Inputs */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Upload Question Paper:</label>
          <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, setQuestionPaper)} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Upload Answer Sheet:</label>
          <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, setAnswerSheet)} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Upload Answer Key:</label>
          <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, setAnswerKey)} />
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h3>Uploaded Files:</h3>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{ width: "100%", padding: "10px 20px", fontSize: "16px", backgroundColor: "#4A90E2", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
