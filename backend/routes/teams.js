const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyUserId = require("../middlewares/verifyUserId.js");

// create team
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const text = "INSERT INTO teams (name, email) VALUES ($1, $2) RETURNING *";
  const values = [name, email];
  const result = await db.query(text, values);
  res.status(201).json(result.rows[0]);
});

// get all teams
router.get("/", async (req, res) => {
  const text = "SELECT * FROM teams";
  const { rows } = await db.query(text);
  res.json(rows);
});

// update team
router.put("/:teamId", verifyUserId, async (req, res) => {
  const { email, name, role } = req.body;
  const { teamId } = req.params;
  if (!email || !name)
    return res.status(400).json({
      error: "Unable to update team. Invalid email or name in request body.",
    });
  const values = [email, name, role, teamId];
  const text =
    "UPDATE teams SET email = $1, name = $2, role = $3 WHERE id = $4 RETURNING *";
  const result = await db.query(text, values);
  res.status(201).json(result.rows[0]);
});

// delete team
router.delete("/:teamId", verifyUserId, async (req, res) => {
  const { teamId } = req.params;
  const values = [teamId];
  const text = "DELETE FROM teams WHERE id = $1";
  const result = await db.query(text, values);
  res.status(204).end();
});

module.exports = router;
