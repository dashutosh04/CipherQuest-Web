// frontend/src/components/TimetableViewer.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function TimetableViewer() {
  const [timetables, setTimetables] = useState([]);
  const [newPeriod, setNewPeriod] = useState({
    userId: "user1",
    day: "",
    time: "",
    course: "",
    room: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/timetables/user1")
      .then((res) => setTimetables(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/timetables", newPeriod);
    setNewPeriod({ userId: "user1", day: "", time: "", course: "", room: "" });
    const res = await axios.get("http://localhost:5000/api/timetables/user1");
    setTimetables(res.data);
  };

  return (
    <div>
      <h2 className="text-3xl mb-8 text-gray-900 animate-fade-in">
        Timetable Tracker
      </h2>
      <form onSubmit={handleSubmit} className="glass-card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Day
            </label>
            <input
              type="text"
              placeholder="e.g., Monday"
              value={newPeriod.day}
              onChange={(e) =>
                setNewPeriod({ ...newPeriod, day: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="text"
              placeholder="e.g., 9:00 AM - 10:00 AM"
              value={newPeriod.time}
              onChange={(e) =>
                setNewPeriod({ ...newPeriod, time: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <input
              type="text"
              placeholder="e.g., Calculus"
              value={newPeriod.course}
              onChange={(e) =>
                setNewPeriod({ ...newPeriod, course: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room
            </label>
            <input
              type="text"
              placeholder="e.g., Room 101"
              value={newPeriod.room}
              onChange={(e) =>
                setNewPeriod({ ...newPeriod, room: e.target.value })
              }
              className="mt-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700"
        >
          Add Period
        </button>
      </form>
      <div className="glass-card">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">
          Your Timetable
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {timetables.map((period) => (
            <div
              key={period.id}
              className="border border-white border-opacity-30 rounded-md p-4 bg-white bg-opacity-10 backdrop-blur-md"
            >
              <p className="text-sm font-medium text-gray-700">
                Day: {period.day}
              </p>
              <p className="text-sm text-gray-600">Time: {period.time}</p>
              <p className="text-sm text-gray-600">Course: {period.course}</p>
              <p className="text-sm text-gray-600">Room: {period.room}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimetableViewer;
