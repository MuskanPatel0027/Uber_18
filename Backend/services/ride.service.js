const rideModel = require('../models/ride.model');
const MapService = require('./maps.service');



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

module.exports.createRide = async ({userId, pickupLocation, dropoffLocation, vehicleType }) => {
    if (!userId || !pickupLocation || !dropoffLocation || !vehicleType) {
        throw new Error('User ID, pickup location, dropoff location, and vehicle type are required');
    }

    const fareDetails = await getFare(pickupLocation, dropoffLocation, vehicleType);
    
    const ride = await rideModel.create({
        userId,
        pickupLocation,
        dropoffLocation,
        vehicleType,
        fare: fareDetails.totalFare,
        distance: fareDetails.distance,
        duration: fareDetails.time,
        status: 'requested',
        createdAt: new Date()
    });

    return ride;
}


async function getFare(pickupLocation, dropoffLocation, vehicleType = 'car') {
    if(!pickupLocation || !dropoffLocation){
        throw new Error('Pickup and dropoff locations are required to calculate fare');
    }

    // Validate vehicle type
    if (!FARE_RATES[vehicleType]) {
        throw new Error(`Invalid vehicle type. Allowed types: ${Object.keys(FARE_RATES).join(', ')}`);
    }

    // Use the new function that accepts coordinates directly
    const distanceTime = await MapService.getDistanceAndTimeFromCoordinates(pickupLocation, dropoffLocation);

    // Convert distance from meters to kilometers and time from milliseconds to minutes
    const distanceInKm = distanceTime.distance / 1000;
    const timeInMinutes = distanceTime.time / 60000;

    const rates = FARE_RATES[vehicleType];
    
    // Calculate fare components
    const distanceFare = distanceInKm * rates.perKmRate;
    const timeFare = timeInMinutes * rates.perMinuteRate;
    const totalFare = rates.baseFare + distanceFare + timeFare;

    return {
        baseFare: rates.baseFare,
        distanceFare: Math.round(distanceFare * 100) / 100,
        timeFare: Math.round(timeFare * 100) / 100,
        totalFare: Math.round(totalFare * 100) / 100,
        distance: Math.round(distanceInKm * 100) / 100,
        time: Math.round(timeInMinutes)
    };
}