const mapService = require('../services/maps.service');
const {validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
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