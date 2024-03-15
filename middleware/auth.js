const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.header("token");
    if (!token) {
      res.status(500).json({ message: "Access Denied" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
