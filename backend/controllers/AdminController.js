const db = require("../db/index.js");

async function getAdminData(req, res, next) {
  try {
    const text = `
    SELECT 
        countries.name as country, 
        strides.id as strides_id,
        strides.created_at, 
        strides.time_in_minutes as duration, 
        strides.distance, 
        strides.user_id,
        users.username,
        users.email,
        users.role,
        teams.name as team,
        teams.id as team_id
    FROM strides
    INNER JOIN countries on strides.country_id = countries.id
    INNER JOIN users on strides.user_id = users.id
    LEFT JOIN teams on strides.team_id = teams.id
    `;
    const data = await db.query(text);
    console.log(data);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getAdminData };
