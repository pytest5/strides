const express = require("express");
const router = express.Router();
const { getAdminData } = require("../controllers/AdminController");

router.get("/", getAdminData);

module.exports = router;
