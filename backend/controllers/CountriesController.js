const db = require("../db/index.js");

async function getAllCountries(req, res, next) {
  try {
    const text = `
    SELECT * FROM countries
    `;
    const data = await db.query(text);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getAllCountries };
