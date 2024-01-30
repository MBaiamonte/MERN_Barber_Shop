const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Description:  Register New User
//Route:        POST - api/users/register
//Access:       Public
const registerUser = (req, res) => {
    User.create(req.body)
        .then( user => res.json({ msg: "user successfully registered", user:user}))
        .catch(err => res.status(400).json(err));
}

//Description:  Get All Users
//Route:        GET - api/users/all 
//Access:       Public
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Description:  Get One User By ID
//Route:        GET - api/users/:id
//Access:       Public
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Update User By ID
//Route:        PUT - api/users/update/:id
//Access:       Private
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Delete One User By ID
//Route:        DELETE - api/users/delete/:id
//Access:       Private
const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Login User
//Route:        DELETE - api/login
//Access:       Public
const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user === null) {
        return res.status(400).json({message: 'login email input does not exist in db' });
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword){
        return res.status(400).json({message: 'password does not match that email' });
    }
    const userToken = jwt.sign({
        id: user._id
    }, process.env.JWT_KEY);
    res.cookie('userToken', userToken,{
        httpOnly: true
    }).json({message: 'Login Successful!', userToken, userId:user._id})
};

// Description: Logout User
// Route:       POST - api/logout
// Access:      Private
const logoutUser = (req, res) => {
    res.clearCookie('userToken');
    res.status(200).json({message : "Logout Successful!"});
};

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    login,
    logoutUser,
}
