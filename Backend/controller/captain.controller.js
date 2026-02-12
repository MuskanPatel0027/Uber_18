const BlacklistToken = require('../models/blacklistToken.models');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const isCaptainExist = await captainModel.findOne({ email: req.body.email });
    if (isCaptainExist) {
      return res.status(400).json({ error: "Captain with this email already exists" });
    }
    const { fullName, email, password, vehicle } = req.body;

    try {   
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            vehicleColor: vehicle.color,
            vehiclePlateNumber: vehicle.plateNumber,
            vehicleCapacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = captain.generateAuthToken();
       
        res.status(201).json({ captain, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await captain.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token,captain});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.getCaptainProfile = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id).select('-password');   
        if (!captain) {
            return res.status(404).json({ error: "Captain not found" });
        }
        res.status(200).json({ captain });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];                 
        await BlacklistToken.create({token});  
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}