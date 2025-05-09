const jwt = require("jsonwebtoken");

const checkIsAdmin = async (req, res, next) => {
  if (req.me.role !== "admin") {
    res.status(404).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = checkIsAdmin;
