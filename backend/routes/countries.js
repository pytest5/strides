const express = require("express");
const router = express.Router();
const { getAllCountries } = require("../controllers/CountriesController");

router.get("/", getAllCountries);

module.exports = router;
