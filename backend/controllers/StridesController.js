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
      "SELECT original_strides_id, ST_X(ST_AsText(location)) AS longitude, ST_Y(ST_AsText(location)) AS latitude, address, country FROM curr_strides_location";
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
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function addStride(req, res, next) {
  const { data, location } = req.body;
  const { id, country_id, username, role, email } = req.me;
  try {
    // Insert the stride and get the stride_id
    const insertStrideText = ` 
      INSERT INTO strides (country_id, user_id, location, address, distance, time_in_minutes, team_id)
      VALUES ($1, $2, ST_POINT($3, $4), $5, $6, $7, $8)
      RETURNING id
    `;
    const strideValues = [
      country_id,
      id,
      location.longitude, // st point
      location.latitude, // st point
      null, // address
      10, // distance
      3, // time in minutes
      data.team ? Number(data.team) : null, // team_id
    ];
    const result = await db.query(insertStrideText, strideValues);
    const strideId = result.rows[0].id;
    // Loop through items in req.body.data
    for (const [itemName, quantity] of Object.entries(data)) {
      if (quantity === 0) continue;
      else {
        console.log("inserting ", itemName, quantity);
        const insertItemText = `
          INSERT INTO strides_items (item_id, stride_id, quantity, created_at)
          VALUES (
            (SELECT id FROM items WHERE name = $1), 
            $2, 
            $3, 
            NOW()
          )
        `;
        const itemValues = [itemName, strideId, quantity];
        await db.query(insertItemText, itemValues);
      }
    }
    res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function deleteStride(req, res, next) {
  const { strideId } = req.body;
  try {
    const text = `
    DELETE FROM strides
    WHERE id =  $1;
    `;
    const values = [strideId];
    const data = await db.query(text, values);
    console.log(data);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function updateStride(req, res, next) {
  const { strideData } = req.body;
  const { distance, duration, team_id, strides_id } = strideData;
  try {
    const text = `
    UPDATE strides
      SET distance = $1,
          time_in_minutes = $2,
          team_id = $3
    WHERE id = $4;
    `;
    const values = [distance, duration, team_id, strides_id];
    const data = await db.query(text, values);
    res.status(200).json({ message: "Updated stride successfully" });
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
  addStride,
  deleteStride,
  updateStride,
};
