const db = require("../db/index.js");

async function getItemsTotals(req, res, next) {
  try {
    const text = `
    SELECT 
      items.name,
      items.material_type,
      items.image_url,
      total_items.value
    FROM 
	    items 
      INNER JOIN total_items ON items.items_id= total_items.items_id
    ORDER BY
 	    total_items.value DESC
    `;
    const data = await db.query(text);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

async function getCurrItemsTotals(req, res, next) {
  try {
    const text = `
    SELECT 
      items.name,
      items.material_type,
      items.image_url,
      curr_total_items.value
    FROM 
	    items 
      INNER JOIN curr_total_items ON items.items_id= curr_total_items.items_id
    ORDER BY
 	    curr_total_items.value DESC
    `;
    const data = await db.query(text);
    res.status(200).json(data.rows);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getItemsTotals, getCurrItemsTotals };
