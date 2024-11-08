const jwt = require("jsonwebtoken");
exports.generateAccessToken = (uid, role) =>
  jwt.sign({ uid, role }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });
