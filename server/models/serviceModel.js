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
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validator function to check if the price has exactly two decimal places
                const regex = /^\d+(\.\d{1,2})?$/;
                return regex.test(value.toString());
            },
            message: 'Price must have exactly two decimal places'
        },
        default:0.00
    },
    forMen:{
        type: Boolean,
        required: false,
        default: false,
    },
    forWomen:{
        type: Boolean,
        required: false,
        default: false,
    },
    forKids:{
        type: Boolean,
        required: false,
        default: false,
    },
},{
    timestamps:true
});

const Service = mongoose.model('Service', serviceSchema );
module.exports = Service;

