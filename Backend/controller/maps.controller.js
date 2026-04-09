const mapService = require('../services/maps.service');
const {validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
  const { address } = req.query;    
    if (!address) {
        return res.status(400).json({ error: 'Address query parameter is required' });
    }

    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.json(coordinates);
    }
    catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

module.exports.getDistanceAndTime = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }   
    const { origin, destination } = req.query;  
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination query parameters are required' });
    }

    try {
        const result = await mapService.getDistanceAndTime(origin, destination);
        res.json(result);
    }
   catch (error) {
    console.error(error.message); // 👈 ADD THIS
    res.status(500).json({ error: error.message });
}

}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);   
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(query);
        res.json(suggestions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}