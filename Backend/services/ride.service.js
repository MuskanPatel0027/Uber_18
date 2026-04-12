const rideModel = require('../models/ride.model');
const MapService = require('./maps.service');
const crypto = require('crypto');


// Fare rates for different vehicle types: bike, car, auto
const FARE_RATES = {
    bike: {
        baseFare: 20,
        perKmRate: 8,
        perMinuteRate: 2
    },
    auto: {
        baseFare: 50,
        perKmRate: 15,
        perMinuteRate: 3
    },
    car: {
        baseFare: 100,
        perKmRate: 25,
        perMinuteRate: 4
    }
};

function getOtp(num) {
    if (!num || num < 1 || typeof num !== 'number') {
        throw new Error('Number of digits must be a positive number');
    }

    // Generate a random number with 'num' digits using crypto
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num) - 1;
    const otp = crypto.randomInt(min, max + 1);

    return otp.toString();
}

async function getFare(pickupLocation, dropoffLocation) {
    if (!pickupLocation || !dropoffLocation) {
        throw new Error('Pickup and dropoff locations are required');
    }

    const distanceTime = await MapService.getDistanceAndTimeFromCoordinates(
        pickupLocation,
        dropoffLocation
    );

    const distanceInKm = distanceTime.distance / 1000;
    const timeInMinutes = distanceTime.time / 60000;

    const fares = {};

    for (const vehicleType in FARE_RATES) {
        const rates = FARE_RATES[vehicleType];

        const totalFare =
            rates.baseFare +
            (distanceInKm * rates.perKmRate) +
            (timeInMinutes * rates.perMinuteRate);

        fares[vehicleType] = Math.round(totalFare * 100) / 100;
    }

    return fares;
}
module.exports.getFare = getFare;

module.exports.createRide = async ({userId, pickupLocation, dropoffLocation, vehicleType }) => {
    if (!userId || !pickupLocation || !dropoffLocation || !vehicleType) {
        throw new Error('User ID, pickup location, dropoff location, and vehicle type are required');
    }

   const fares = await getFare(pickupLocation, dropoffLocation);

const selectedFare = fares[vehicleType];

if (!selectedFare) {
    throw new Error('Invalid vehicle type');
}
    
   const ride = await rideModel.create({
    userId,
    pickupLocation,
    dropoffLocation,
    vehicleType,
    otp: getOtp(4),
    fare: selectedFare,   // ✅ correct
    status: 'requested',
    createdAt: new Date()
});

    return ride;
}


