// backend/routes/complaints.js
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await req.app.get("db").query("SELECT * FROM complaints");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { title, description, priority, submittedBy } = req.body;
  const [result] = await req.app
    .get("db")
    .query(
      "INSERT INTO complaints (title, description, priority, submittedBy) VALUES (?, ?, ?, ?)",
      [title, description, priority, submittedBy]
    );
  res.json({ id: result.insertId, ...req.body, status: "Pending" });
});

router.put("/:id", async (req, res) => {
  const { status } = req.body;
  await req.app
    .get("db")
    .query("UPDATE complaints SET status = ? WHERE id = ?", [
      status,
      req.params.id,
    ]);
  const [rows] = await req.app
    .get("db")
    .query("SELECT * FROM complaints WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
});

module.exports = router;
