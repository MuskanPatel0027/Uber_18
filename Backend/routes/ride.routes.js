const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const AuthMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controller/ride.controller');


router.post('/create',
    AuthMiddleware.authUser,
    body('pickupLocation').isString().isLength({min: 3}).withMessage('Pickup location must be a string with at least 3 characters'),
    body('dropoffLocation').isString().isLength({min: 3}).withMessage('Dropoff location must be a string with at least 3 characters'),
    body('vehicleType').isIn(['bike', 'car', 'auto']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/fare',
    AuthMiddleware.authUser,
    query('pickupLocation').isString().isLength({min: 3}).withMessage('Pickup location must be a string with at least 3 characters'),    
    query('dropoffLocation').isString().isLength({min: 3}).withMessage('Dropoff location must be a string with at least 3 characters'),
    
    rideController.getFare
)




module.exports = router;