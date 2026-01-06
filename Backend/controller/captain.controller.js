const captailModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const isCaptainExist = await captailModel.findOne({ email: req.body.email });
    if (isCaptainExist) {
      return res.status(400).json({ error: "Captain with this email already exists" });
    }
    const { fullName, email, password, vehicle } = req.body;

    try {   
        const hashedPassword = await captailModel.hashPassword(password);
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