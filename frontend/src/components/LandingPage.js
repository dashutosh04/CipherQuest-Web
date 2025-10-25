// frontend/src/components/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h2 className="animate-fade-in">Welcome to UniVerse</h2>
        <p className="animate-fade-in-up delay-100">
          Your all-in-one platform for managing campus life – events,
          complaints, timetables, clubs, and feedback.
        </p>
        <Link to="/events" className="hero-button animate-pulse">
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-12">
        <h3 className="text-3xl text-center mb-8">Our Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card">
            <Link to="/events" className="text-xl text-blue-600 mb-2">
              Event & Notice Board
            </Link>
            <p className="text-gray-600">
              Stay updated with campus events and notices in one centralized
              hub.
            </p>
          </div>
          <div className="glass-card">
            <Link to="/complaints" className="text-xl text-blue-600 mb-2">
              Complaint System
            </Link>
            <p className="text-gray-600">
              Submit and track complaints or requests with ease and
              transparency.
            </p>
          </div>
          <div className="glass-card">
            <Link to="/timetable" className="text-xl text-blue-600 mb-2">
              Timetable Tracker
            </Link>
            <p className="text-gray-600">
              Manage your class schedules and track attendance effortlessly.
            </p>
          </div>
          <div className="glass-card">
            <Link to="/clubs" className="text-xl text-blue-600 mb-2">
              Club Collaboration
            </Link>
            <p className="text-gray-600">
              Organize club activities, assign tasks, and collaborate
              seamlessly.
            </p>
          </div>
          <div className="glass-card">
            <Link to="/feedback" className="text-xl text-blue-600 mb-2">
              Feedback System
            </Link>
            <p className="text-gray-600">
              Share suggestions anonymously and upvote ideas to improve campus
              life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
