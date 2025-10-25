// frontend/src/components/ClubSpace.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function ClubSpace() {
  const [clubs, setClubs] = useState([]);
  const [newClub, setNewClub] = useState({
    name: "",
    members: [],
    tasks: [],
    files: [],
  });
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    status: "To Do",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clubs")
      .then((res) => setClubs(res.data));
  }, []);

  const handleClubSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/clubs", newClub);
    setNewClub({ name: "", members: [], tasks: [], files: [] });
    const res = await axios.get("http://localhost:5000/api/clubs");
    setClubs(res.data);
  };

  const handleTaskSubmit = async (clubId) => {
    await axios.post(
      `http://localhost:5000/api/clubs/${clubId}/tasks`,
      newTask
    );
    setNewTask({ title: "", assignee: "", status: "To Do" });
    const res = await axios.get("http://localhost:5000/api/clubs");
    setClubs(res.data);
  };

  return (
    <div>
      <h2 className="text-3xl mb-8 text-gray-900 animate-fade-in">
        Club/Project Collaboration
      </h2>
      <form onSubmit={handleClubSubmit} className="glass-card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Club Name
            </label>
            <input
              type="text"
              placeholder="Club Name"
              value={newClub.name}
              onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Members (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., John, Jane"
              value={newClub.members.join(",")}
              onChange={(e) =>
                setNewClub({ ...newClub, members: e.target.value.split(",") })
              }
              className="mt-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700"
        >
          Create Club
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="glass-card animate-fade-in-up">
            <h3 className="text-lg font-semibold text-blue-600">{club.name}</h3>
            <p className="text-sm text-gray-600 mt-2">
              Members: {JSON.parse(club.members || "[]").join(", ")}
            </p>
            <h4 className="text-md font-semibold mt-4 text-blue-600">Tasks</h4>
            <div className="space-y-3 mt-2">
              {JSON.parse(club.tasks || "[]").map((task, index) => (
                <div
                  key={index}
                  className="border border-white border-opacity-30 rounded-md p-3 bg-white bg-opacity-10 backdrop-blur-md"
                >
                  <p className="text-sm font-medium text-gray-700">
                    Title: {task.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    Assignee: {task.assignee}
                  </p>
                  <p className="text-sm text-gray-600">Status: {task.status}</p>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTaskSubmit(club.id);
              }}
              className="mt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assignee
                  </label>
                  <input
                    type="text"
                    placeholder="Assignee"
                    value={newTask.assignee}
                    onChange={(e) =>
                      setNewTask({ ...newTask, assignee: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700"
              >
                Add Task
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubSpace;
