const db = require("../db");
const { capitalizeFirstLetter } = require("../utils");
// const Supercluster = require("supercluster");
const convertToGeoJson = require("../utils/convertToGeoJson");
const reverseGeocode = require("../utils/reverseGeocode");

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
    const text = "SELECT * FROM curr_total_strides_stats";
    const data = await db.query(text);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getCurrTotalStridesStats(req, res, next) {
  try {
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
  const { id, country_id } = req.me;
  try {
    // Insert the stride and get the stride_id
    const insertStrideText = ` 
      INSERT INTO strides (country_id, user_id, location, address, distance, time_in_minutes, team_id)
      VALUES ($1, $2, ST_POINT($3, $4), $5, $6, $7, $8)
      RETURNING id
    `;
    const geoJsonObj = await reverseGeocode({
      longitude: location.longitude,
      latitude: location.latitude,
    });
    const address = geoJsonObj.features[0].properties.name;
    const strideValues = [
      country_id,
      id,
      location.longitude, // st point
      location.latitude, // st point
      address, // address
      10, // distance
      3, // time in minutes
      data.team ? Number(data.team) : null, // team_id
    ];

    const result = await db.query(insertStrideText, strideValues);
    const strideId = result.rows[0].id;
    const itemNameMap = {
      glass: "glass bottle",
      plastic: "plastic bottle",
      metal: "metal can",
    };
    // Loop through items in req.body.data
    for (let [itemName, quantity] of Object.entries(data)) {
      if (quantity === 0) continue;
      if (itemName === "team") continue;
      else {
        itemName = itemNameMap[itemName] || itemName;
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
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function updateStride(req, res, next) {
  const { strideData } = req.body;
  const { distance, duration, team_id, stride_id } = strideData;
  try {
    const text = `
    UPDATE strides
      SET distance = $1,
          time_in_minutes = $2,
          team_id = $3
    WHERE id = $4;
    `;
    const values = [distance, duration, team_id, stride_id];
    console.log(values);
    if (values.includes(undefined)) {
      return res.status(400).json({
        message: "Unable to update strides. Please check request body.",
      });
    }
    const data = await db.query(text, values);
    res.status(200).json({ message: "Updated stride successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getMyStrides(req, res, next) {
  const { userId } = req.params;
  try {
    const text = `
    SELECT strides.id as stride_id, strides.created_at, strides.distance, strides.address, strides.time_in_minutes as duration, teams.id as team_id, teams.name as team_name 
    FROM strides
    LEFT JOIN teams ON teams.id = strides.team_id
    WHERE strides.user_id = $1
    ORDER BY strides.created_at DESC;
    `;
    const values = [userId];
    const data = await db.query(text, values);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getClusters(req, res) {
  console.log("getting clusters in backend");
  try {
    const Supercluster = (await import("supercluster")).default;
    const { zoom, bbox } = req.body;
    const text = `
    SELECT original_strides_id, ST_X(ST_AsText(location)) AS longitude, ST_Y(ST_AsText(location)) AS latitude, address, country FROM curr_strides_location
    `;
    const data = await db.query(text);
    const geoJson = convertToGeoJson(data.rows);
    console.log("geoJson data", geoJson);
    const index = new Supercluster({
      radius: 50, // Match Mapbox GL settings
      maxZoom: 14, // Match Mapbox GL maxZoom
    }).load(geoJson.features); //  Load GeoJSON features into Supercluster
    const clusters = index.getClusters(bbox, zoom); // Get clusters for the given bounding box and zoom level
    console.log("clusters", clusters);
    res.json({
      // res.json needs to be in this shape as its going into a mapbox <Source
      type: "FeatureCollection",
      features: clusters, // The clusters array
    });
  } catch (error) {
    console.error("Error fetching clusters:", error);
    res.status(500).json({ error: "Failed to fetch clusters" });
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
  getMyStrides,
  getClusters,
};
