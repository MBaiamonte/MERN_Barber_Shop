const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        unique: [true, "please enter a different email"],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phoneNumber:{
        type:Number,
        required: false,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        // validate: {
        //     validator: function (value) {
        //         // You can add custom password strength validation here
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        //     },
        //     message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
        // },
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

userSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword)
    .set( (value) => {this._confirmPassword = value});

userSchema.pre('validate', function(next) {
    if(this.password != this._confirmPassword){
        this.validate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next()
        });
});

const User = mongoose.model('User', userSchema);
module.exports = User;
