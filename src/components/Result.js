import React from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ insights }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        background: "linear-gradient(135deg, #f3f4f6, #e9eef5)",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px", color: "#4A4A4A" }}>
          Analysis Results
        </h1>
      </header>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "left",
        }}
      >
        {insights ? (
          <div>
            <h2 style={{ color: "#4A90E2", fontSize: "20px" }}>Insights</h2>
            <pre
              style={{
                background: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {JSON.stringify(insights, null, 2)}
            </pre>
          </div>
        ) : (
          <p style={{ color: "#777", fontSize: "18px" }}>
            No insights available. Please submit data to analyze.
          </p>
        )}
      </div>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4A90E2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Result;
