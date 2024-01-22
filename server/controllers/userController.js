const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

//Description:  Create New User
//Route:        POST - api/users/create
//Access:       Public
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: 'Unable to create user' });
    }
};

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
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            console.error('Invalid login credentials');
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.status(200).json({ token });
        console.log('Login Successful');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error });
    }
};

// Description: Logout User
// Route:       POST - api/logout
// Access:      Private
const logoutUser = (req, res) => {
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    login,
    logoutUser,
}
