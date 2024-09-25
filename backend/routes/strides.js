const express = require("express");
const {
  getStridesByCountry,
  getAllStridesLocation,
  getCurrAllStridesLocation,
  getTotalStridesStats,
  getCurrTotalStridesStats,
  addStride,
  deleteStride,
  updateStride,
} = require("../controllers/StridesController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/location", getAllStridesLocation);
router.get("/current/location", getCurrAllStridesLocation);
router.get("/country/:country", getStridesByCountry);
router.get("/total-stats", getTotalStridesStats);
router.get("/current/total-stats", getCurrTotalStridesStats);
router.post("/", verifyToken, addStride);
router.delete("/", verifyToken, deleteStride);
router.put("/", verifyToken, updateStride);

module.exports = router;
