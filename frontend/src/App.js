// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import EventBoard from "./components/EventBoard";
import ComplaintForm from "./components/ComplaintForm";
import TimetableViewer from "./components/TimetableViewer";
import ClubSpace from "./components/ClubSpace";
import FeedbackSystem from "./components/FeedbackSystem";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <header className="header">
          <h1>CampusConnect</h1>
        </header>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/complaints">Complaints</Link>
          <Link to="/timetable">Timetable</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/feedback">Feedback</Link>
        </nav>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<EventBoard />} />
            <Route path="/complaints" element={<ComplaintForm />} />
            <Route path="/timetable" element={<TimetableViewer />} />
            <Route path="/clubs" element={<ClubSpace />} />
            <Route path="/feedback" element={<FeedbackSystem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
