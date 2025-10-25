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
      .get("http://cipher-quest-web-back.vercel.app/api/feedback")
      .then((res) => setFeedbacks(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://cipher-quest-web-back.vercel.app/api/feedback",
      newFeedback
    );
    setNewFeedback({ content: "", anonymous: false });
    const res = await axios.get(
      "http://cipher-quest-web-back.vercel.app/api/feedback"
    );
    setFeedbacks(res.data);
  };

  const handleUpvote = async (id) => {
    await axios.put(
      `http://cipher-quest-web-back.vercel.app/api/feedback/${id}/upvote`
    );
    const res = await axios.get(
      "http://cipher-quest-web-back.vercel.app/api/feedback"
    );
    setFeedbacks(res.data);
  };

  return (
    <div>
      <h2 className="text-3xl mb-8 text-gray-900 animate-fade-in">
        Feedback/Suggestion System
      </h2>
      <form onSubmit={handleSubmit} className="glass-card mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              placeholder="Your feedback or suggestion"
              value={newFeedback.content}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, content: e.target.value })
              }
              className="mt-1"
              rows="4"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={newFeedback.anonymous}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, anonymous: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Submit anonymously
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700"
        >
          Submit Feedback
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="glass-card animate-fade-in-up">
            <p className="text-gray-600">{feedback.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Anonymous: {feedback.anonymous ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">Upvotes: {feedback.upvotes}</p>
            <button
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 animate-pulse"
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
