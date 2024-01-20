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
        unique: [true, "please enter a different email"]
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

// userSchema.methods.matchPassword = async function (enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password)
// };
//hash passwords before saving user to db, if not working with password then next else salt and hash
// userSchema.pre('save',async function (next){
//     if(!this.isModified('password')){
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt)
// });
const User = mongoose.model('User', userSchema);
module.exports = User;
