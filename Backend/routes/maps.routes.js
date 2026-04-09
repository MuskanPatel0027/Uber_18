const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const  mapController = require('../controller/maps.controller');
const { query, validationResult } = require('express-validator');

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    AuthMiddleware.authUser, mapController.getCoordinates
)

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    AuthMiddleware.authUser, mapController.getDistanceAndTime
)

router.get('/get-suggestions',
    query('query').isString().withMessage('Query must be a string').isLength({min:3}).withMessage('Query must be at least 3 characters long'),
    AuthMiddleware.authUser, mapController.getAutoCompleteSuggestions

)

module.exports = router;