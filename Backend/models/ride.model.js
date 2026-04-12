const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
   
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    captain :{
        type: mongoose.Schema.Types.ObjectId, ref: 'Captain',
      
    },
    pickupLocation: {       
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },  
    dropoffLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },  
    fare : {
        type: Number,
        required: true
     },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'onGoing', 'completed', 'cancelled'],           
        default: 'pending'
    },
    distance:{
            type:Number
    },
     duration:{
            type:Number
    },
    paymentId:{
            type:String
    },
     orderId:{
            type:String
    },
     signature:{
            type:String
    },
    otp:{
        type: String,
        select:false,
        required : true
    }
});

module.exports = mongoose.model('Ride', rideSchema);
