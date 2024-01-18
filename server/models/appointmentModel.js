const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        required: true,
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    comments:{
        type: String,
        required:false,
        maxlength: [500, "Please keep comments under 500 characters"]
    },
},{
    timestamps:true
});

const Appointment = mongoose.model('Appointment',appointmentSchema);
module.exports = Appointment;
