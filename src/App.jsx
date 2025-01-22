import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import DistributionsPage from "./DistributionsPage";
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/distributions" element={<DistributionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
