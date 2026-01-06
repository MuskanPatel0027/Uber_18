const userModel = require("../models/user.models");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const blacklistModel = require("../models/blacklistToken.models");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  const userObj = user.toObject();
  delete userObj.password;
  res.status(201).json({ user: userObj, token });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  // Clear the cookie on the client
  res.clearCookie("token");

  // Safely extract token from cookie or Authorization header
  const token =
    req.cookies?.token ||
    (req.headers?.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    // No token provided — return a useful response
    return res.status(400).json({ error: "No token provided" });
  }

  try {
    await blacklistModel.blacklist(token);
  } catch (err) {
    // Ignore duplicate-key error — token already blacklisted
    if (err.code === 11000) {
      return res.status(200).json({ message: "Logged out successfully" });
    }

    return res.status(500).json({ error: "Server error" });
  }

  return res.status(200).json({ message: "Logged out successfully" });
};
