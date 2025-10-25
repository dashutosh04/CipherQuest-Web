// frontend/src/components/ComplaintForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function ComplaintForm() {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    priority: "low",
    submittedBy: "",
  });

  useEffect(() => {
    axios
      .get("http://cipher-quest-web-back.vercel.app/api/complaints")
      .then((res) => setComplaints(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://cipher-quest-web-back.vercel.app/api/complaints",
      newComplaint
    );
    setNewComplaint({
      title: "",
      description: "",
      priority: "low",
      submittedBy: "",
    });
    const res = await axios.get(
      "http://cipher-quest-web-back.vercel.app/api/complaints"
    );
    setComplaints(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://cipher-quest-web-back.vercel.app/api/complaints/${id}`,
      { status }
    );
    const res = await axios.get(
      "http://cipher-quest-web-back.vercel.app/api/complaints"
    );
    setComplaints(res.data);
  };

  return (
    <div>
      <h2 className="text-3xl mb-8 text-gray-900 animate-fade-in">
        Complaint/Request System
      </h2>
      <form onSubmit={handleSubmit} className="glass-card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Complaint Title"
              value={newComplaint.title}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, title: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              value={newComplaint.priority}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, priority: e.target.value })
              }
              className="mt-1"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe the issue"
              value={newComplaint.description}
              onChange={(e) =>
                setNewComplaint({
                  ...newComplaint,
                  description: e.target.value,
                })
              }
              className="mt-1"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Submitted By
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={newComplaint.submittedBy}
              onChange={(e) =>
                setNewComplaint({
                  ...newComplaint,
                  submittedBy: e.target.value,
                })
              }
              className="mt-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700"
        >
          Submit Complaint
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="glass-card animate-fade-in-up">
            <h3 className="text-lg font-semibold text-blue-600">
              {complaint.title}
            </h3>
            <p className="text-gray-600 mt-2">{complaint.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Priority: {complaint.priority}
            </p>
            <p className="text-sm text-gray-500">
              Status:
              <span
                className={`ml-1 ${
                  complaint.status === "Resolved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {complaint.status}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Submitted By: {complaint.submittedBy}
            </p>
            {complaint.status !== "Resolved" && (
              <button
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                onClick={() => updateStatus(complaint.id, "Resolved")}
              >
                Mark Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComplaintForm;
