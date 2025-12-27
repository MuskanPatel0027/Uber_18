const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklistToken.models");

module.exports.authUser = async (req, res, next) => {
  // Support token from either an httpOnly cookie or Authorization header (Bearer <token>)
  const cookieToken = req.cookies && req.cookies.token;
  const authHeader = req.headers && (req.headers.authorization || req.headers.Authorization);

  let token;
  if (cookieToken) token = cookieToken;
  else if (authHeader && authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
  else if (authHeader) token = authHeader; // allow raw token in header

// const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const isBlacklisted = await blacklistModel.findOne({ token });
  if(isBlacklisted){
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(401).json({ error: "Invalid token." });

    req.user = user;
    return next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};