import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Result from "./components/Result";
import WaitingPage from "./components/WaitingPage"; // Import WaitingPage
import ChatbotPage from "./components/ChatbotPage"; // Import ChatbotPage

const App = () => {
  const [insights, setInsights] = useState(null); // Stores insights from backend
  const [isWaiting, setIsWaiting] = useState(false); // Tracks waiting state
  const [showChatbot, setShowChatbot] = useState(false); // Tracks chatbot visibility

  return (
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route
          path="/"
          element={<Home setInsights={setInsights} setIsWaiting={setIsWaiting} />}
        />

        {/* Route for Waiting Page */}
        <Route
          path="/waiting"
          element={
            isWaiting ? <WaitingPage /> : <Navigate to="/" replace />
          }
        />

        {/* Route for Result Page */}
        <Route
          path="/result"
          element={
            insights ? (
              <div>
                <Result
                  insights={insights}
                  toggleChatbot={() => setShowChatbot(!showChatbot)}
                />
                {showChatbot && <ChatbotPage closeChatbot={() => setShowChatbot(false)} />}
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Route for Undefined Paths */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h1>404 - Page Not Found</h1>
              <button onClick={() => (window.location.href = "/")}>
                Go Home
              </button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
