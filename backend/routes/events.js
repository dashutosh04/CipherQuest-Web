// backend/routes/events.js
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await req.app.get("db").query("SELECT * FROM events");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { title, description, date, category, audience, postedBy } = req.body;
  const [result] = await req.app
    .get("db")
    .query(
      "INSERT INTO events (title, description, date, category, audience, postedBy) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, date, category, audience, postedBy]
    );
  res.json({ id: result.insertId, ...req.body });
});

module.exports = router;
