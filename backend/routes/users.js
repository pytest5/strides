const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyUserId = require("../middlewares/verifyUserId.js");
const { userSignup, userLogin } = require("../controllers/UsersController.js");

router.post("/signup", userSignup);
router.post("/login", userLogin);

// create user
// router.post("/", async (req, res) => {
//   const { name, email } = req.body;
//   const text = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
//   const values = [name, email];
//   const result = await db.query(text, values);
//   res.status(201).json(result.rows[0]);
// });

// get all users
router.get("/", async (req, res) => {
  const text = "SELECT * FROM users";
  const { rows } = await db.query(text);
  res.json(rows);
});

// update user
router.put("/:userId", verifyUserId, async (req, res) => {
  const { email, name, role } = req.body;
  const { userId } = req.params;
  if (!email || !name)
    return res.status(400).json({
      error: "Unable to update user. Invalid email or name in request body.",
    });
  const values = [email, name, role, userId];
  const text =
    "UPDATE users SET email = $1, name = $2, role = $3 WHERE id = $4 RETURNING *";
  const result = await db.query(text, values);
  res.status(201).json(result.rows[0]);
});

// delete user
router.delete("/:userId", verifyUserId, async (req, res) => {
  const { userId } = req.params;
  const values = [userId];
  const text = "DELETE FROM users WHERE id = $1";
  const result = await db.query(text, values);
  res.status(204).end();
});

// get current user
router.post("/current", async (req, res) => {
  console.log("here");
  const { email } = req.body;
  console.log(email);
  const text = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const dbRes = await db.query(text, values);
  const { password, ...rest } = dbRes.rows[0];
  res.json(rest);
});

module.exports = router;
