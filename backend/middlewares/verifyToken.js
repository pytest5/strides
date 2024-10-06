const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).send("Unauthorized User");
    }
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.me = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyToken;
