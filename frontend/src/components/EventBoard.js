// frontend/src/components/EventBoard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function EventBoard() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    audience: "",
    postedBy: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/events", newEvent);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      category: "",
      audience: "",
      postedBy: "",
    });
    const res = await axios.get("http://localhost:5000/api/events");
    setEvents(res.data);
  };

  return (
    <div>
      <h2 className="text-2xl mb-6 text-gray-900">Event & Notice Board</h2>
      <form onSubmit={handleSubmit} className="card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              placeholder="Category (e.g., Academics)"
              value={newEvent.category}
              onChange={(e) =>
                setNewEvent({ ...newEvent, category: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Audience
            </label>
            <input
              type="text"
              placeholder="Audience (e.g., All Students)"
              value={newEvent.audience}
              onChange={(e) =>
                setNewEvent({ ...newEvent, audience: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Posted By
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={newEvent.postedBy}
              onChange={(e) =>
                setNewEvent({ ...newEvent, postedBy: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="mt-1"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="datetime-local"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="mt-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Post Event
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="card">
            <h3 className="text-lg font-semibold text-blue-600">
              {event.title}
            </h3>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Category: {event.category}</p>
            <p className="text-sm text-gray-500">Audience: {event.audience}</p>
            <p className="text-sm text-gray-500">Posted By: {event.postedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventBoard;
