// backend/routes/clubs.js
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await req.app.get("db").query("SELECT * FROM clubs");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { name, members, tasks, files } = req.body;
  const [result] = await req.app
    .get("db")
    .query(
      "INSERT INTO clubs (name, members, tasks, files) VALUES (?, ?, ?, ?)",
      [
        name,
        JSON.stringify(members),
        JSON.stringify(tasks),
        JSON.stringify(files),
      ]
    );
  res.json({ id: result.insertId, ...req.body });
});

router.post("/:id/tasks", async (req, res) => {
  const [club] = await req.app
    .get("db")
    .query("SELECT tasks FROM clubs WHERE id = ?", [req.params.id]);
  const tasks = JSON.parse(club[0].tasks || "[]");
  tasks.push(req.body);
  await req.app
    .get("db")
    .query("UPDATE clubs SET tasks = ? WHERE id = ?", [
      JSON.stringify(tasks),
      req.params.id,
    ]);
  res.json({ tasks });
});

module.exports = router;
