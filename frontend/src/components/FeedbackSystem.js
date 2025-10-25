// frontend/src/components/FeedbackSystem.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    content: "",
    anonymous: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedback")
      .then((res) => setFeedbacks(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/feedback", newFeedback);
    setNewFeedback({ content: "", anonymous: false });
    const res = await axios.get("http://localhost:5000/api/feedback");
    setFeedbacks(res.data);
  };

  const handleUpvote = async (id) => {
    await axios.put(`http://localhost:5000/api/feedback/${id}/upvote`);
    const res = await axios.get("http://localhost:5000/api/feedback");
    setFeedbacks(res.data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Feedback/Suggestion System</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <textarea
          className="border p-2 w-full"
          placeholder="Feedback"
          value={newFeedback.content}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, content: e.target.value })
          }
        />
        <label>
          <input
            type="checkbox"
            checked={newFeedback.anonymous}
            onChange={(e) =>
              setNewFeedback({ ...newFeedback, anonymous: e.target.checked })
            }
          />
          Anonymous
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit Feedback
        </button>
      </form>
      <div>
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="border p-4 mb-2">
            <p>{feedback.content}</p>
            <p>Anonymous: {feedback.anonymous ? "Yes" : "No"}</p>
            <p>Upvotes: {feedback.upvotes}</p>
            <button
              className="bg-green-500 text-white p-1 mt-2"
              onClick={() => handleUpvote(feedback.id)}
            >
              Upvote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackSystem;
