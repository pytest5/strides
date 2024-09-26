const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyUserId = require("../middlewares/checkIsAdmin.js");

// DEV create user
router.post("/dev/users", async (req, res) => {
  const { name, role } = req.body;
  const text = "INSERT INTO users (name, role) VALUES ($1, $2)";
  const values = [name, role];
  const result = await db.query(text, values);
  res.json(result);
});

// DEV create table
router.post("/dev/models", async (req, res) => {
  const text =
    "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, role VARCHAR)";
  const dbRes = await db.query(text);
  res.send(dbRes);
});

module.exports = router;
