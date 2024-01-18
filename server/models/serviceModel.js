const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
        default: 10,
    },
    price:{
        type:Number, 
        required: true,
        default: 0.00,
    }
},{
    timestamps:true
});

const Service = mongoose.model('Service', serviceSchema );
module.exports = Service;

