const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getUser(params) {}

function getAllUsers(params) {}

async function userSignup(req, res, next) {
  const { username, password, email, countryl } = req.body;
  console.log(req.body);
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let role = "user";
  const text =
    "INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [username, hashedPassword, email, role];
  // sign token
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(JSON.stringify({ username, role, email }), secret_key);
  try {
    await db.query(text, values);
    res.status(201).json(token);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function userLogin(req, res, next) {
  const { email, password } = req.body;
  const text = `SELECT * FROM users WHERE email=$1`;
  const values = [email];
  const dbRes = await db.query(text, values);
  const user = dbRes.rows[0];
  const { password: hashedPassword, username, role } = user;
  const isAuth = await bcrypt.compare(password, hashedPassword);
  // sign token
  const token = jwt.sign(
    JSON.stringify({ username, role, email }),
    process.env.SECRET_KEY
  );
  res.json(token);
}

module.exports = { getUser, getAllUsers, userLogin, userSignup };
