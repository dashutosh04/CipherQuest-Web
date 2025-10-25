// backend/server.js
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const complaintRoutes = require("./routes/complaints");
const timetableRoutes = require("./routes/timetables");
const clubRoutes = require("./routes/clubs");
const feedbackRoutes = require("./routes/feedback");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: "as1.nerdysid.in",
  user: "u44_raUuWUqtzW", // Replace with your MySQL user
  password: "wT1xzN^=Qp+nvxE=2tyRr1Ju", // Replace with your MySQL password
  database: "s44_CAMPUSCONN",
});

// Initialize database and tables
async function initializeDatabase() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATETIME,
        category VARCHAR(50),
        audience VARCHAR(50),
        postedBy VARCHAR(100),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS complaints (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority ENUM('low', 'medium', 'high') DEFAULT 'low',
        status VARCHAR(50) DEFAULT 'Pending',
        submittedBy VARCHAR(100),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS timetables (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(100),
        day VARCHAR(20),
        time VARCHAR(50),
        course VARCHAR(100),
        room VARCHAR(50)
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS clubs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        members JSON,
        tasks JSON,
        files JSON
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        anonymous BOOLEAN,
        upvotes INT DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database and tables initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

initializeDatabase();

// Make db available to routes
app.set("db", db);

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
