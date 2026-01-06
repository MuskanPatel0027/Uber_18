const captailModel = require('../models/captain.model');  

module.exports.createCaptain = async ({
    firstName, lastName, email, password,
    vehicleColor, vehiclePlateNumber, vehicleCapacity, vehicleType 
 }) => {
    if(!firstName || !email || !password || !vehicleColor ||
         !vehiclePlateNumber || !vehicleCapacity || !vehicleType) {
        throw new Error("All fields are required!!");
    }
    const captain = await captailModel.create({     
        fullName: { 
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {  
            color: vehicleColor,
            plateNumber: vehiclePlateNumber,
            capacity: vehicleCapacity,
            vehicleType
        }
    });
    return captain; // Return the Mongoose document
 }