const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required: [true, "Please enter your first name"] 
    },
    lname:{
        type:String,
        required: [true, "Please enter your last name"] 
    },
    email:{
        type:String,
        required: [true, "Please enter your email"], 
        unique: true
    },
    phoneNumber:{
        type:Number,
        required: false,
    },
    password:{
        type:String,
        required: [true, "Please enter a Password"], 
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default:false, 
    },
    isBarber:{
        type: Boolean,
        required: true, 
        default: false
    },
},{
    timestamps:true
});
const User = mongoose.model('User', userSchema);
module.exports = User;
