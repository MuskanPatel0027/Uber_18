const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const  mapController = require('../controller/maps.controller');
const { query, validationResult } = require('express-validator');

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    AuthMiddleware.authUser, mapController.getCoordinates)



module.exports = router;