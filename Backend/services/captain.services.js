const captailModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    vehicleColor, vehiclePlate, vehicleCapacity, vehicleType 
 }) => {
    if(!firstname || !email || !password || !vehicleColor ||
         !vehiclePlate || !vehicleCapacity || !vehicleType) {
        throw new Error("All fields are required!!");
    }
    const captain = await captailModel.create({     
        fullname: { 
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {  
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType
        }
    });
    return captain; // Return the Mongoose document
 }