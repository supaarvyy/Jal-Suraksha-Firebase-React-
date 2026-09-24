const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool
const pool = new Pool({
  user: "your_db_user",
  host: "localhost",
  database: "jal_suraksha",
  password: "your_db_password",
  port: 5432,
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// POST endpoint to save ASHA data
app.post("/api/asha-data", async (req, res) => {
  const { location, waterSource, ph, tbs, ecoli } = req.body;

  try {
    const query = `
      INSERT INTO asha_data (location, water_source, ph, tbs, ecoli)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [location, waterSource, ph, tbs, ecoli];
    const result = await pool.query(query, values);
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
