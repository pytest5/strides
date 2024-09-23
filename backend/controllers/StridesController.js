const db = require("../db");
const { capitalizeFirstLetter } = require("../utils");

async function getStridesByCountry(req, res, next) {
  try {
    const country = req.params.country;
    const text =
      "SELECT original_strides_id, ST_X(ST_AsText(location)) AS longitude, ST_Y(ST_AsText(location)) AS latitude, address, country FROM strides_location WHERE country=$1";
    const values = [capitalizeFirstLetter(country)];
    const data = await db.query(text, values);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getAllStridesLocation(req, res, next) {
  try {
    const text =
      "SELECT original_strides_id, ST_X(ST_AsText(location)) AS longitude, ST_Y(ST_AsText(location)) AS latitude, address, country FROM strides_location";
    const data = await db.query(text);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getCurrAllStridesLocation(req, res, next) {
  try {
    const text =
      "SELECT original_strides_id, ST_X(ST_AsText(location)) AS longitude, ST_Y(ST_AsText(location)) AS latitude, address, country FROM curr_strides_location";
    const data = await db.query(text);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getTotalStridesStats(req, res, next) {
  try {
    console.log("getting total strides stats");
    const text = "SELECT * FROM curr_total_strides_stats";
    const data = await db.query(text);
    console.log("hey", data);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getCurrTotalStridesStats(req, res, next) {
  try {
    console.log("getting current total strides stats");
    const text = "SELECT * FROM total_strides_stats";
    const data = await db.query(text);
    console.log("hey", data);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getStridesByCountry,
  getAllStridesLocation,
  getCurrAllStridesLocation,
  getTotalStridesStats,
  getCurrTotalStridesStats,
};
