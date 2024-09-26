const express = require("express");
const router = express.Router();
const db = require("../db");
const checkIsAdmin = require("../middlewares/checkIsAdmin");

// create team
router.post("/", async (req, res) => {
  try {
    const { name, ispublic } = req.body;
    const { country_id, id } = req.me;
    const text = `
    WITH team_insert AS (
      INSERT INTO teams (name, country_id, ispublic) 
      VALUES ($1, $2, $3) 
      RETURNING id
    )
    INSERT INTO users_teams (team_id, user_id)
    VALUES ((SELECT id FROM team_insert), $4)
    RETURNING *`;
    const values = [name, country_id, ispublic, id];
    const result = await db.query(text, values);
    res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json({ error: "Unable to create team" });
  }
});

// get all teams info for admin
router.get("/admin", checkIsAdmin, async (req, res) => {
  try {
    const text = `
    SELECT teams.name as team_name, teams.country_id as country_id, teams.ispublic, teams.created_at, users.username 
    FROM teams 
    INNER JOIN users_teams
    ON teams.id = users_teams.team_id
    INNER JOIN users
    ON users_teams.user_id = users.id
    ORDER BY teams.created_at DESC;
    `;
    const values = [];
    const result = await db.query(text, values);
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json({ error: "Unable to retrieve teams" });
  }
});

// get all public teams
router.get("/public", async (req, res) => {
  try {
    const text = `
    SELECT * FROM TEAMS WHERE ispublic = TRUE
    ORDER BY teams.created_at DESC;    
    `;
    const values = [];
    const result = await db.query(text, values);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json({ error: "Unable to retrieve public team" });
  }
});

// join teams
router.post("/join", async (req, res) => {
  const { id } = req.me;
  const { teamId } = req.body;
  try {
    const checkText = `
      SELECT * FROM users_teams 
      WHERE user_id = $1 AND team_id = $2;
    `;
    const checkValues = [id, teamId];
    const checkResult = await db.query(checkText, checkValues);
    console.log(checkResult.rows);
    const isAlreadyInTeam = checkResult.rows.length === 1;
    if (isAlreadyInTeam) {
      return res.status(404).json({ error: "Already in team" });
    }
    const text = `
    INSERT INTO users_teams (team_id, user_id)
    VALUES ($1, $2);
    `;
    const values = [teamId, id];
    const result = await db.query(text, values);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json({ error: "Unable to retrieve public team" });
  }
});

// get my teams
router.get("/my", async (req, res) => {
  try {
    const { id } = req.me;
    const text = `
    SELECT teams.id as id, teams.name as name, teams.country_id as country_id, teams.ispublic, teams.created_at
    FROM teams 
    INNER JOIN users_teams
    ON teams.id = users_teams.team_id
    WHERE users_teams.user_id = $1
    ORDER BY teams.created_at DESC;
`;

    const values = [id];
    const result = await db.query(text, values);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json({ error: "Unable to create team" });
  }
});

// update team
router.put("/:teamId", async (req, res) => {
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

// leave team
router.delete("/:teamId", async (req, res) => {
  try {
    const { id } = req.me;
    const { teamId } = req.params;
    console.log("here", req.params);
    const text = `
     DELETE FROM users_teams 
     WHERE user_id = $1
      AND team_id = $2
    `;
    const values = [id, teamId];
    await db.query(text, values);
    res.status(204).end();
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json({ error: "Unable to remove team from user" });
  }
});

module.exports = router;
