const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getUser(params) {}

function getAllUsers(params) {}

async function userSignup(req, res, next) {
  const { username, password, email, country: country_id } = req.body;
  console.log("req body: ", req.body);
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let role = "user";
  const text =
    "INSERT INTO users (username, password, email, role, country_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [username, hashedPassword, email, role, country_id];
  try {
    const dbRes = await db.query(text, values);
    const { id, username, role, email, country_id } = dbRes.rows[0];
    // sign token
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(
      JSON.stringify({ username, role, email, id, country_id }),
      secret_key
    );
    res.status(201).json(token);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function userLogin(req, res, next) {
  const { email, password } = req.body;

  const text = `SELECT * FROM users WHERE email=$1`;
  const values = [email];
  const dbRes = await db.query(text, values);
  const user = dbRes.rows[0];
  if (!user) {
    return res.status(401).json({ error: "Invalid login details" });
  }
  const { password: hashedPassword, created_at, ...rest } = user;
  const isAuth = await bcrypt.compare(password, hashedPassword);

  if (!isAuth) {
    return res.status(401).json({ error: "Invalid login details" });
  }
  // sign token
  const token = jwt.sign(JSON.stringify(rest), process.env.SECRET_KEY);
  res.json(token);
}

module.exports = { getUser, getAllUsers, userLogin, userSignup };
