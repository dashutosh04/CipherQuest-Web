// backend/routes/timetables.js
const express = require("express");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const [rows] = await req.app
    .get("db")
    .query("SELECT * FROM timetables WHERE userId = ?", [req.params.userId]);
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { userId, day, time, course, room } = req.body;
  const [result] = await req.app
    .get("db")
    .query(
      "INSERT INTO timetables (userId, day, time, course, room) VALUES (?, ?, ?, ?, ?)",
      [userId, day, time, course, room]
    );
  res.json({ id: result.insertId, ...req.body });
});

module.exports = router;
