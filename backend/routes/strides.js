const express = require("express");
const {
  getStridesByCountry,
  getAllStridesLocation,
  getCurrAllStridesLocation,
  getTotalStridesStats,
  getCurrTotalStridesStats,
} = require("../controllers/StridesController");
const router = express.Router();

router.get("/location", getAllStridesLocation);
router.get("/current/location", getCurrAllStridesLocation);
router.get("/country/:country", getStridesByCountry);
router.get("/total-stats", getTotalStridesStats);
router.get("/current/total-stats", getCurrTotalStridesStats);

module.exports = router;
