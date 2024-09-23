const express = require("express");
const {
  getItemsTotals,
  getCurrItemsTotals,
} = require("../controllers/ItemsController");
const router = express.Router();

router.get("/totals", getItemsTotals);
router.get("/current/totals", getCurrItemsTotals);

module.exports = router;
