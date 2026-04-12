const rideService = require('../services/ride.service');
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickupLocation, dropoffLocation, vehicleType } = req.body;

    try {
        // Convert address strings to coordinates
        const pickupCoords = await mapService.getAddressCoordinates(pickupLocation);
        const dropoffCoords = await mapService.getAddressCoordinates(dropoffLocation);

        const ride = await rideService.createRide({ 
            userId: req.user._id, 
            pickupLocation: pickupCoords, 
            dropoffLocation: dropoffCoords, 
            vehicleType 
        });
        res.status(201).json(ride);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickupLocation, dropoffLocation} = req.query;
    try {
        // Convert address strings to coordinates
        const pickupCoords = await mapService.getAddressCoordinates(pickupLocation);
        const dropoffCoords = await mapService.getAddressCoordinates(dropoffLocation);
        const fareDetails = await rideService.getFare(pickupCoords, dropoffCoords);
        res.json(fareDetails);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}