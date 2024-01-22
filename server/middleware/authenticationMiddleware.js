const jwt = require('jsonwebtoken')
const User = ('../models/userModel');

//Protected User Routes Middleware
const protect = async(req,res,next) =>{
    let token;
    if (req.cookies && req.cookies.jwt){
        token = req.cookies.jwt
    }
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({error: 'Not Authorized, token failed'})
        }
    } else {
        res.status(401).json({error: 'Not Authorized, no token'})
    }
}

//Protected Admin Routes Middleware
const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    } else{
        res.status(401).json({error: 'Not Authorized as admin'})
    }
};

module.exports =  {protect, admin}
