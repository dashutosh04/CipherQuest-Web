// backend/routes/feedback.js
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await req.app.get("db").query("SELECT * FROM feedback");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { content, anonymous } = req.body;
  const [result] = await req.app
    .get("db")
    .query("INSERT INTO feedback (content, anonymous) VALUES (?, ?)", [
      content,
      anonymous,
    ]);
  res.json({ id: result.insertId, ...req.body, upvotes: 0 });
});

router.put("/:id/upvote", async (req, res) => {
  await req.app
    .get("db")
    .query("UPDATE feedback SET upvotes = upvotes + 1 WHERE id = ?", [
      req.params.id,
    ]);
  const [rows] = await req.app
    .get("db")
    .query("SELECT * FROM feedback WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
});

module.exports = router;
