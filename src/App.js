import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Result from "./components/Result";

const App = () => {
  const [insights, setInsights] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setInsights={setInsights} />} />
        <Route
          path="/result"
          element={insights ? <Result insights={insights} /> : <Navigate to="/" replace />}
        />
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h1>404 - Page Not Found</h1>
              <button onClick={() => window.location.href = "/"}>Go Home</button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
